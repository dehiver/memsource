# Memsource Assignment

## Project setup

### Requirements
- Node.js
- Yarn (`npm install -g yarn`)
- @vue/cli (`yarn global add @vue/cli`)


### Install and setup
- `yarn install`
- Create a copy of .env.sample file and edit VUE_APP_API_BASE_URL to match your local API URL [https://github.com/jiri-zmeskal-memsource/memsource-assignment](https://github.com/jiri-zmeskal-memsource/memsource-assignment)
- If having issues with CORS in local env - add following lines to Rest Configurer (src\main\java\com\memsource\assignments\config\RestConfigurer.java after line #13):
    `config.getCorsRegistry().addMapping("/**")
        .allowedOrigins("*")
        .allowedMethods("GET", "PUT", "PATCH", "POST", "DELETE");`

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```
