
Moved import paths:

 * Moved annotations as: `import { NAME } from "./io/hyperify/core/Request"` -> `./io/hyperify/core/request/NAME.ts`
 * Moved utils under `./io/hyperify/core/request/utils/NAME.ts`
 * Moved types under `./io/hyperify/core/request/types/NAME.ts`

Renamed methods:

 * `new RequestRouter()` -> `RequestRouterImpl.create()`
 * `RequestRouter.` -> `RequestRouterImpl.`
 * `Request.Method` -> `RequestMethod`
 * `Request.Status` -> `RequestStatus`
 * `Request.ParamType` -> `RequestParamType`
 * `Request.Type` -> `RequestType`
 * `Request.Error` -> `RequestError`
 * `Request.createBadRequestError` -> `RequestError.createBadRequestError`
 * `Request.createNotFoundRequestError` -> `RequestError.createNotFoundRequestError`
 * `Request.createMethodNotAllowedRequestError` -> `RequestError.createMethodNotAllowedRequestError`
 * `Request.createConflictRequestError` -> `RequestError.createConflictRequestError`
 * `Request.createInternalErrorRequestError` -> `RequestError.createInternalErrorRequestError`
 * `Request.throwBadRequestError` -> `RequestError.throwBadRequestError`
 * `Request.throwNotFoundRequestError` -> `RequestError.throwNotFoundRequestError`
 * `Request.throwMethodNotAllowedRequestError` -> `RequestError.throwMethodNotAllowedRequestError`
 * `Request.throwConflictRequestError` -> `RequestError.throwConflictRequestError`
 * `Request.throwInternalErrorRequestError` -> `RequestError.throwInternalErrorRequestError`
 * `Request.Header` -> `RequestHeader`
 * `Request.PathVariable` -> `PathVariable`
 * `Request.ModelAttribute` -> `ModelAttribute`
 * `Request.OptionsMapping` -> `OptionsMapping`
 * `Request.Get` -> `GetMapping`
 * `Request.Post` -> `PostMapping`
 * `Request.Put` -> `PutMapping`
 * `Request.Delete` -> `DeleteMapping`
 * `Request.Body` -> `RequestBody`
 * `Request.Operation` -> `Operation`
 * `Request.OpenAPIDefinition` -> `OpenAPIDefinition`
