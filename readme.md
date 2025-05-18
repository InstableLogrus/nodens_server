
# Nodens

Gestion de demandes d'emploi (et éviter les duplications) WIP

stocke les demandes dans une DB MondoDB (pour changer facilement le schema)

La sécurité et l'authentification des utilisateurs se fait via jeton JWT


## Incorporé dans l'API

authentification: JWT  (encrypted payload JWE)  
fausses données: https://github.com/faker-js/faker  
doc: swagger https://swagger.io/ (a compléter)  
logger: morgan  
cli: commander  
jest: unit test -> jest with ts https://stackoverflow.com/a/64223627/30231852  

## CLI
makefake: créer des données de test directement dans la DB
    pour l'instant utilisateurs  
jwt-utils: création, vérification et (TODO) reset of the secret



## TODO

### incorporer dotenvx 
https://github.com/dotenvx/dotenvx -> dotenv mais chiffré

### liaison linkedin
utilisant leur API our un web scraper

## Scripts

```npm run dev```&emsp;&emsp;serveur de dev (avec reload)  
```npm start```&emsp;&emsp;&emsp;serveur prod  
```npm run test```&emsp;&nbsp;série de tests unitaires 

## Fichiers
```text
.
├── .env                  # Environment variables (gitignored)
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── @types                # custom types
├── api.http              # HTTP requests for testing (TODO)
├── auth_server.md        # JWT auth doc
├── babel.config.json
├── env-sample            # Example of .env file
├── eslint.config.js    
├── jest.config.ts        # Config Jest
├── package.json          # Project dependencies and scripts
├── readme.md             # this file
├── src
│   ├── app.ts            # App entry point
│   ├── cli               # All CLI commands
│   ├── connection        # MongoDB connection setup
│   ├── controller        # Controllers for handling business logic
│   ├── environment.d.ts  # Type of env var
│   ├── index.js          # Index file pointed by the script
│   ├── models            # Mongoose models
│   ├── routes            # API routes
│   ├── swagger.yaml      # Swagger documentation in YAML (TODO)
│   ├── swaggerConfig.js  # Swagger config
│   └── utils             # Tools / utils
├── tests                 # Unit test (Jest)  
├── tsconfig.json         # Config for Typescript
└── vercel.json           # Config vercel (not used)


```


basé sur 
-------------------------------------------------------------------------------------------
# Node.js MongoDB Boilerplate 
origine --> https://github.com/saniaali224/node-mongo-swagger-awss3-boilerplate

