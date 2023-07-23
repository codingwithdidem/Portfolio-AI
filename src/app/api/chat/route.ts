import { kv } from '@vercel/kv';
import { Ratelimit } from '@upstash/ratelimit';
import { StreamingTextResponse, LangChainStream } from 'ai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { Document } from 'langchain/document';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Save the chat history to KV
  await kv.set('chat_history', JSON.stringify(messages));

  if (
    process.env.NODE_ENV != 'development' &&
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const ip = req.headers.get('x-forwarded-for');
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(2, '1 d'), // 2 requests per day per IP
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `portfolio_ratelimit_${ip}`,
    );

    if (!success) {
      return new Response('You have reached your request limit for the day.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  }

  const memory = new BufferMemory({
    memoryKey: 'chat_history',
    inputKey: 'question', // The key for the input to the chain
    outputKey: 'text', // The key for the final conversational output of the chain
    returnMessages: true, // If using with a chat model
  });

  const { stream, handlers } = LangChainStream();

  const doc = new Document({
    pageContent: `Hello, I am Didem Küçükkaraaslan. Frontend developer and content creator. I love to create videos
  about tech products, coding languages and frameworks. I dont love icecream.`,
  });

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const splitData = await textSplitter.splitDocuments([doc]);

  // Load the docs into the vector store
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitData,
    new OpenAIEmbeddings(),
  );

  let streamedResponse = '';

  const nonStreamingModel = new ChatOpenAI({});
  const streamingModel = new ChatOpenAI({
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token) {
          streamedResponse += token;
        },
      },
    ],
  });
  const chain = ConversationalRetrievalQAChain.fromLLM(
    streamingModel,
    vectorStore.asRetriever(),
    {
      returnSourceDocuments: true,
      memory,
      questionGeneratorChainOptions: {
        llm: nonStreamingModel,
      },
    },
  );

  chain
    .call(
      {
        question: messages[messages.length - 1].content,
        chatHistory: messages,
      },
      [handlers],
    )
    .catch((e) => {
      console.log(e);
    });

  return new StreamingTextResponse(stream);
}
