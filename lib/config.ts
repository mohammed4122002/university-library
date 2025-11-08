const config = {
  env: {
    imagekit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    apiEndpoint:
      process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000",

    databaseUrl: process.env.DATABASE_URL!,
  },
};

export default config;
