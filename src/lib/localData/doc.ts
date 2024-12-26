import { bash, go, json, type LanguageType } from "svelte-highlight/languages";

export type DocumentationContent = {
  blockText: {
    link: { url: string; label: string; external: boolean };
    text: string;
    bold: string;
  }[];
  code: {code:string,type:LanguageType<string>};
  subTitle: string;
  warning:string
};
export type DocumentationType = {
  title: string;
  content: DocumentationContent[];
  context: string;
};

function LinkInternal(label:string,url:string){
  return{
    link:{
        label,
        url,
        external:false
    }
  }
}

function LinkExternal(label:string,url:string){
  return{
    link:{
      label:label,
      url:url,
      external:true
    }
  }
}
function Text(text:string):{text:string}{
  return {text}
}

function BlockText(...blockText:any[]){
  return {
    blockText:blockText
  }
}

function Bold(bold:string){
  return {bold}
}

function Warning(warning:string){
  return {warning}
}

function SubTitle(subTitle:string){
  return {subTitle}
}

function Code(code:string,type?:LanguageType<string>){
  return {code:{
    code:code,
    type: type ?? go
  }}
}

function Content(...content){
  return content
}
function NovoDocumento(title:string,context:string,content:DocumentationContent[]){
  return {title,content,context}
}
function Documentos(...docs:DocumentationType[]){
  return docs
}


const docAbout:DocumentationType = NovoDocumento("About","Introduction",Content(
  SubTitle("What is this?"),
  BlockText(
    Text(`Licor framework is a quick way upon to a clean and easy architeture for your webapplication,
    it was build with the intent of getting a particular abstraction observated in others frameworks like`),
    LinkExternal(`Nest JS`,"https://nestjs.com/"), 
    Text(`.<br/><br/>The author original
    intent is to create not just a high configurable environment for your restfull api's, but bring to the developer a handful of popular options
    to handle with as well a strict pattern to keep a good design to the code itself.`),
    Text(`Some features of licor included: `),
    Bold(`Json/Querys validation`),
    Bold('custom protected routes'),
    Bold('in built jwt tokens generator'),
  ),
  Warning(`Also take notes that this project is like a newborn child, it is very cute but has a long way to being as powerful as frameworks like Gin.`),
  SubTitle("Who made this mess?"),
  BlockText(
    Text(`If you have take the interest in this little thing of mine and want to throw some new ideas, you can collab with this project, send me a message
    in my git account: <br/> `),
    Bold("Click the cute cat icon in the header of this page")
  )
))

const docQuickStart:DocumentationType=NovoDocumento("Quick Start","Introduction",Content(
  SubTitle("Getting started"),
  BlockText(
    Text("Import Licor thought the following command:")
  ),
  Code(`go get github.com/dalton02/licor
go mod tidy`,bash),
  BlockText(
    Text("Create a .env file, with the following key: ")
  ),
  Code(`JWT_SECRET = yourkeyhere`,bash),
  BlockText(
    Text("Now you can write your licor code: ")
  ),
  Code(`package main

import (
	"net/http"
	"github.com/dalton02/licor/httpkit"
	"github.com/dalton02/licor/licor"
)

func HelloWorld(response http.ResponseWriter, request *http.Request) httpkit.HttpMessage{
	jsonData := map[string]interface{}{
		"data": "Hello World",
	}
	return httpkit.AppSucess("Message received", jsonData, response)
}

func main() {
  port := "3003"
  licor.Public[any, any]("/helloworld").Get(HelloWorld)
  licor.Init(port)
}`),
SubTitle("Cherry Cake"),
BlockText(
  Text(`In the original scope of this project, I was building a folder structure that I think best fits this project, 
    following a module folder structure and keeping the routes separate from the controllers and services of the application. 
    <br/> <br/> If you are starting a new project and want a good approach to keep things organized, I recommend downloading the following repository:`),
  LinkExternal("Base Licor","https://github.com"),
  
),
))

const docPrivates:DocumentationType = NovoDocumento("Routes","Overview",Content(
BlockText(
    Text(`Every licor route must have either a Public or Protected route, thus either of them will share some similarities with respect of validating
    json schemas and querys, that can be read about in the `),
    LinkInternal("validation","/docs/validation"),
    Text(" section.")
),
SubTitle("Public"),
BlockText(
  Text(`Public routes as per say, is just common use routes that can be used by any user, its just a nice way to say: 
    "hey, anyone who have access to the internet can use this route", and thats it, following that you will put the http function and going on with your day`),
),
Code(`licor.Public[jsonDtoValidation,queryDtoValidation]("/public").Post(anyoneCanPostHere)`),
SubTitle("Protected"),
BlockText(
  Text(`When in your application you have to manage JWT tokens, decrypt then, then manage permissions of differents type of users....
  <br/><br/>
  Can be quite a bummer, with that in mind, you can just say in the Private Route who can consume say API`)
),
Code(`licor.Protected[jsonDtoValidation,queryDtoValidation]
("/private","userWithAccess","otherUserWithAccess").Post(function)`),
BlockText(
  Text(`It takes a array of permissions that is stored inside the data of a jwt: `)
),
Code(`token:{
    data: {
      userName:"username",
      profile:"userWithAccess"
    }
    exp: 123123
}`,json),

BlockText(
  Text(`Then check if this user profile match some of the permissions type in the route, if not, it throws a `),
  Bold(`401 http message`)
),
SubTitle("Types"),
BlockText(
  Text(`There is many ways a backend can receive a token, with cookies,headers or even in the body in some cases. Licor will try to cover most of the popular use cases`)
),
SubTitle("Authorization Header"),
BlockText(
  Text(`It's the default licor behavior for protection, when accessing a protected route in this mode, you must send a Bearer Token in the request:  `)
),
Code(`{
  "method": "GET",
  "url": "https://api.example.com/api/example",
  "headers": {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
  },
}`,json),

Code(`func main() {

	licor.SetBearerTokenAuthorizationHeader() //Setting authorization mode

	licor.Public[any, any]("/retrieve").Get(retrieve)
	licor.Protected[any, any]("/access").Get(access)
	licor.Protected[any, any]("/access-admin", "admin").Get(accessAdmin)

	licor.Init("3003")
}`),
Warning(`For now, just this use case is covered, in the future i will be putting others`)
))



const docValidation:DocumentationType = NovoDocumento("Validation","Overview",Content(
BlockText(
    Text(`The author most favorite (and painful to make) part of the project, it uses the new Go Generic, so make sure you have the last up to date version`),
),
SubTitle("Using Generics"),
BlockText(
  Text(`Every time you declare your endpoint, you must give some dto for validation, specifiying  then in the open brackets after delcaring the type of route
  <br/><br/>
  The first dto in the open brackets refeer to the json schema, while the second is used to put the URL query schema <br/><br/>
  Like that: `),
),

Code(`licor.Public[dto.YOURDTOJSONSCHEMA, dto.YOURDTOQUERYSCHEMA]("/route").Post(function)`),
SubTitle("Json Validation"),
BlockText(
  Text(`To declare the dto, you must create a type struct with `),
  Bold(`validator`),
  Text(` declarations`)
),
Code(`package dto
type UserLogin struct {
	Login string ${'`json:"login" validator:"required"`'}
	Code int ${'`json:"code" validator:"required"`'}
}
`),
BlockText(
  Text(`We use in union with the json declaration to specify how the schema will be theated. <br/> <br/> In this example we are saying 
  that login and code are required propretys and login must be a string, as per code must be a int, the type declaration will be taken in account as well
  <br/><br/> 
  `)
),
Code(`package main

import (
  dto "core/modules/test.module/dto"
)

func main(){
  licor.Public[dto.UserLogin, any]("/auth/login").
  Post(loginFunction)  
}
`),
SubTitle("Query Validation"),
BlockText(
  Text(`Now, imagine that in this request, you want to send some querys to whatever reason you need 
  `)
),

Code(`package dto
type UserLogin struct {
	Login string ${'`json:"login" validator:"required"`'}
	Code int ${'`json:"code" validator:"required"`'}
}
type UserQuery struct {
	Type string ${'`query:"type" validator:"required"`'}
}
`),
Code(`package main

import (
  dto "core/modules/test.module/dto"
)

func main(){
  licor.Public[dto.UserLogin, dto.UserQuery]("/auth/login").
  Post(loginFunction)  
}
`),

BlockText(
  Text(`With that, now the request will need to have a query named type to proceed with execution, if not will send a `),
  Bold(`404`),
  Text(` with a custom message to the client`)
),

))


const dockit:DocumentationType = NovoDocumento("Httpkit","Reference",Content(

SubTitle("Generating JWT"),
BlockText(
  Text(`Call to generate your jwt data token.<br/>`),
  Bold(`warning: you must have in your .env file a JWT_SECRET`)
),
Code(`httpkit.GenerateJwt[T any](data T) (string, error) `),


SubTitle("Extract JWT"),
BlockText(
  Text("Fetches data embedded within a JWT token using the Authorization header.<br/>"),
  Bold("Note: Ensure the token is valid and the Authorization header is correctly formatted."),
),
Code(`httpkit.GetDataToken(request *http.Request) (map[string]interface{}, error)`),

SubTitle("Getting JSON Schema"),
BlockText(
   Text("Call to get the current JSON schema from the request data.<br/><br/>"),
),
Code(`httpkit.GetJsonSchema(request *http.Request) map[int][]string`),

SubTitle("Extracting Bearer Token"),
BlockText(
  Text("Utility function to extract the Bearer token from the Authorization header.<br/>"),
  Bold("Note: Ensure the Authorization header contains a valid Bearer token."),
),
Code(`httpkit.GetBearerToken(auth string) string`),

SubTitle("URL Parameters"),
BlockText(
  Text("Returns a struct with the count of URL parameters and a map for accessing the parameter values.<br/>"),
  Bold("Error Handling: Throws an error if parameters cannot be retrieved."),
),
Code(`httpkit.GetUrlParams(request *http.Request) (dtoRequest.Params, error)`),


SubTitle("Sucess Responses"),
BlockText(
  Text("Functions to generate http data messages")
),
Code(`httpkit.AppSucess(message string, data any, response http.ResponseWriter)`),
Code(`httpkit.AppSucessCreate(message string, data any, response http.ResponseWriter)`),

SubTitle("Error Responses"),
BlockText(
  Text("Functions to generate http error messages")
),
Code(`httpkit.AppConflict(message string, response http.ResponseWriter)`),
Code(`httpkit.AppBadRequest(message string, response http.ResponseWriter)`),
Code(`httpkit.AppUnauthorized(message string, response http.ResponseWriter)`),
Code(`httpkit.AppForbidden(message string, response http.ResponseWriter)`),
Code(`httpkit.AppNotFound(message string, response http.ResponseWriter)`),
Code(`httpkit.AppInternal(message string, response http.ResponseWriter)`),
Code(`httpkit.AppNotImplemented(message string, response http.ResponseWriter)`),
))
  

export const doc: DocumentationType[] = Documentos(  
 docAbout,
 docQuickStart,
 docPrivates,
 docValidation,
 dockit
);
console.log(doc)