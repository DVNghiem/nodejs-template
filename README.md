# Template code nodejs 

    ├── nodemon.json
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── src
    │   ├── apis                # controller
    │   │   ├── index.ts
    │   │   └── user.ts
    │   ├── helpers             # handle logit
    │   │   ├── index.ts
    │   │   └── user.ts
    │   ├── index.ts
    │   ├── libs
    │   │   ├── dao.ts
    │   │   ├── exception.ts
    │   │   ├── index.ts
    │   │   ├── security.ts
    │   │   └── server.ts
    │   ├── models              # define collection db
    │   │   ├── index.ts
    │   │   └── user.ts
    │   ├── schemas             # validate data
    │   │   ├── index.ts
    │   │   └── user.ts
    │   └── tasks               # run task in queue
    │       ├── broker.ts
    │       ├── index.ts
    │       └── user.ts
    └── tsconfig.json

