
# Nodens

Gestion de demandes d'emploi (et éviter les duplications)

stocke les demandes dans une DB MondoDB (pour changer facilement le schema)


## incorporé dans l'API

fausses données: https://github.com/faker-js/faker  
doc: swagger https://swagger.io/ (a compléter)  
logger: morgan  
cli: commander  
jest: unit test -> jest with ts https://stackoverflow.com/a/64223627/30231852  

## CLI
makefake: créer des données de test directement dans la DB
    pour l'instant utilisateurs



## TODO

### incorporer dotenvx 
https://github.com/dotenvx/dotenvx -> dotenv mais chiffré

### liaison linkedin
utilisant leur API our un web scraper



```text
.
├── connection
│ └── connect.js    # MongoDB connection setup
├── controller      # Controllers for handling business logic
├── Models          # Mongoose models
├── node_modules
├── Routes          # API routes
├── tests           # unit test (Jest)
├── utils           # tools / utils
├── jest.config.ts  # config for Jest
├── .env            # Environment variables (gitignored)
├── .eslintrc.json  # ESLint configuration
├── .gitignore      # Files and directories to ignore in Git
├── .prettierrc     # Prettier configuration
├── env-sample      # Sample environment file
├── api.http        # HTTP requests for testing
├── app.ts          # Main application entry point
├── makefake.ts     # CLI for making test data (linked to command line via "npm link")
├── index.js        # Index file to start the server
├── package.json    # Project dependencies and scripts
├── tsconfig        # config for Typescript
└── swagger.yml     # Swagger documentation in YAML
```


basé sur 
-------------------------------------------------------------------------------------------
# Node.js MongoDB Boilerplate 
origine --> https://github.com/saniaali224/node-mongo-swagger-awss3-boilerplate

