import { StreamingTextResponse, LangChainStream, Message } from 'ai';
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
