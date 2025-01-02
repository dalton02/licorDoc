
import { bash, go, json, type LanguageType } from "svelte-highlight/languages";

export type DocumentationContent = {
  blockText: {
    link: { url: string; label: string; external: boolean };
    text: string;
    bold: string;
  }[];
  code: {code:string,type:LanguageType<string>};
  subTitle: string;
  warning:string;
  note:string;
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

function Note(note:string){
  return {note}
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
  Warning(`Also take notes that this project is like a newborn child, it's very cute but has a long way to being as powerful as frameworks like Gin.`),
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
  Text(`In the initial scope of this project, I designed a folder structure that I believe best suits its needs. 
    This structure follows a modular approach, keeping routes separate from the application's controllers and services.
    <br/> It kinda suits the framework.
    <br/> <br/> If you are starting a new project and want a good approach to keep things organized, I recommend downloading the following repository:`),
  LinkExternal("Template","https://github.com/dalton02/licorTemplate"),
  
),
))

const docPrivates:DocumentationType = NovoDocumento("Routes","Overview",Content(
BlockText(
    Text(`Every licor route must have either a Public or Protected endpoint, thus either of them will share some similarities with respect of validating
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
SubTitle("Protected Types"),
BlockText(
  Text(`There is many ways a backend can authenticate a user, with cookies, tokens or sessions. 
    <br/>Licor will try to cover most of the popular use cases, but for now we have this possibilities`)
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

  //If you want to rewrite the custom error messages
	licor.SetCustomInvalidTokenMessage("This token is invalid")
	licor.SetCustomNotAuthorizedMessage("Token is valid, but your profile does not have access to the content")


	licor.Public[any, any]("/retrieve").Get(retrieve)
	licor.Protected[any, any]("/access").Get(access) //Any user with a valid token can access
	licor.Protected[any, any]("/access-admin", "admin").Get(accessAdmin) //Just a admin user can access

	licor.Init("3003")
}`),
SubTitle("Custom Protection"),
BlockText(
  Text(`If you want to set your own protection you can write your function returning the following values: `)
),
Code(`func myCustomProtection(response http.ResponseWriter, request *http.Request, extras ...any) (bool, *http.Request, httpkit.HttpMessage)`),
BlockText(
  Text(`In the main function you set: `)
),
Code(`func main(){
	licor.SetCustomProtection(myCustomProtection)  
}`),
Note(`In the custom function you can return the request with a context to access new values`),
))

const docFunctions:DocumentationType = NovoDocumento("Functions","Overview",Content(
  SubTitle("Licor Functions"),
  BlockText(
    Text(`Every licor function behaves like a net/http function, will receive the ResponseWriter and the Request as usual, but must return a httpkit.HttpMessage`)
  ),
  Code(`func mainFunction(response http.ResponseWriter, request *http.Request) (httpkit.HttpMessage) {
    
    var message httpkit.HttpMessage
    var data any

    //Code to be executed
    message = httpkit.AppSucess("Operation sucess",data)

    return message, true
}`),
  SubTitle(`MiddleWares`),
  BlockText(
    Text(`To incorporate middlewares into your route, simply list them after the primary handler function. 
      <br/>The middleware functions will execute sequentially, and the main function will only be invoked if all middlewares are passed.`)
  ),
  Code(`licor.Public[any, any]("/route-of-middlewares").Get(mainFunction,middle1,middle2)`),
  BlockText(
    Text(`In the above case, the application will pass first to the middle1, following by the middle2, and if all them pass,
    then the mainFunction will be executed`)
  ),
  SubTitle(`What to return in a middleware`),
  BlockText(
    Text(`When creating a middleware function, you must add one more value to the return function, now you will be returning a `),
    Bold(`httpkit.HttpMessage`),
    Text(` following by a `),
    Bold(`boolean`)
  ),
  Code(`func middle1(response http.ResponseWriter, request *http.Request) (httpkit.HttpMessage, bool) {
    var message httpkit.HttpMessage
    fmt.Println("Everything good around here, will proceed to the next middleware")
    return message, true
  }
  
  func middle2(response http.ResponseWriter, request *http.Request) (httpkit.HttpMessage, bool) {
    var message httpkit.HttpMessage
    message = httpkit.AppBadRequest("Something went wrong, can't proceed operation") //This message will be returning to the client
    return message, false
  }
  
  func mainFunction(response http.ResponseWriter, request *http.Request) (httpkit.HttpMessage, bool) {
    var message httpkit.HttpMessage
    fmt.Println("This function will not be executed")
    return message, true
  
  }
  
  func main(){
    licor.Public[any,any]("/route-of-middlewares").Get(mainFunction,middle1,middle2)
  }
  `),
  BlockText(
    Text(`Returning false in the boolean will (obviously) break the chain of functions and send to the client the http message that was returned by the failed middleware`)
  ),
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
  Text(`We use in union with the json declaration to specify how the schema will be treated. <br/> <br/> In this example we are saying 
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
Code(`httpkit.GenerateJwt[T any](data T,minutes int) (string, error) `),


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
  
  
const docresponses:DocumentationType = NovoDocumento("Responses","Overview",Content(

  SubTitle("How to respond a request"),
  BlockText(
    Text(`Every http function must return a `),
    Bold(`httpkit.HttpMessage`),
    Text(` that is the pattern of responses that your server currently have, every HttpMessage will have the following structure`)
  ),
  Code(`{
  message: "Some message you like to send",
  data: {
    item1: "any data struct you want",
    item2: "will be put",
    nest:{
      item3: "here"
    },
  statusCode: 200
  }    
}`,json),
BlockText(
  Text(`In the httpkit package you will receive many auxiliar functions to send this messages, correctly named in the use cases that you want to send. <br/><br/>`),
  Text(`Example: You want to send that a account was `),
  Bold(`Created`),
  Text(`?`)
),
Code(`return httpkit.AppSucessCreate("User was created", yourData)`),
BlockText(
  Text(`Too see more functions check the section of responses in `),
  LinkInternal(`httpkit`,`/docs/httpkit`)
), 
));

    
const docvalidator:DocumentationType = NovoDocumento("Validator","Reference",Content(

  SubTitle("Required"),
  BlockText(
    Text(`Set the JSON field to be mandatory and of the same type as inferred by the struct.`),
  ),
  Code(`type Test struct {
  Name   string ${'`json:"name" validator:"required"`'} // This field must be a string
  Number int    ${'`json:"number" validator:"required"`'} // This field must be an integer
}`),

  SubTitle("Optional"),
  BlockText(
    Text(`Set the JSON field to be optional and allow omitting it during validation.`),
  ),
  Code(`type Test struct {
  MiddleName string ${'`json:"middle_name" validator:"optional"`'} // This field can be omitted
}`),

  SubTitle("NumericString"),
  BlockText(
    Text(`Ensure that the field contains a string representing a numeric value.`),
  ),
  Code(`type Test struct {
  Age string ${'`json:"age" validator:"numericString"`'} // This field must be a numeric string
}`),

  SubTitle("StrongPassword"),
  BlockText(
    Text(`Validate that the field contains a strong password. A strong password includes upper and lower case characters, numbers, and special characters.`),
  ),
  Code(`type Test struct {
  Password string ${'`json:"password" validator:"strongPassword"`'} // This field must be a strong password
}`),

  SubTitle("Email"),
  BlockText(
    Text(`Validate that the field contains a valid email address.`),
  ),
  Code(`type Test struct {
  Email string ${'`json:"email" validator:"email"`'} // This field must be a valid email address
}`),


  SubTitle("DateString"),
  BlockText(
    Text(`Ensure that the field contains a valid date string format.`),
  ),
  Code(`type Test struct {
  BirthDate string ${'`json:"birth_date" validator:"dateString"`'} // This field must be a valid date string
}`)

));

const docLicor:DocumentationType = NovoDocumento("Licor","Reference",Content(

  SubTitle("Methods"),
  Code(`licor.Public[any,any].Post(func)`),
  Code(`licor.Public[any,any].Put(func)`),

  Code(`licor.Public[any,any].Get(func)`),
  Code(`licor.Public[any,any].Patch(func)`),
  Code(`licor.Public[any,any].Delete(func)`),
  Code(`licor.Public[any,any].FormData(func)`),

  SubTitle(`Configuration`),
  Code(`licor.Init(string)`),
  Code(`licor.SetMaxSizeFormData(int)`),
  Code(`licor.SetCustomProtection(func)`),
  Code(`licor.SetCustomInvalidTokenMessage(string)`),
  Code(`licor.SetCustomNotAuthorizedMessage(string)`),
  Code(`licor.SetMaxSizeFormData(int)`),

))
    

export const doc: DocumentationType[] = Documentos(  
 docAbout,
 docQuickStart,
 docPrivates,
 docValidation,
 docresponses,
 dockit,
 docFunctions,
 docvalidator,
 docLicor
);
console.log(doc)