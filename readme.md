## API Reference

## URL

_Server_

```
http://localhost:8080
```

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## RESTful endpoints

## USER API

### POST /api/user/user-login

> Post Login User

_Request Header_

```
don't needed
```

_Request Body_

```
{
    "email" : <email>,
    "password": <password>
}
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success Login User"
}
```

_Response (400 - Password is not same)_

```
{
    "message": "Password is not same"
}
```

_Response (400 - Validation Error)_

```
{
    "message": "*/fullName*/ min length 3 and required"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### POST /api/user/register

> Post New User

_Request Header_

```
don't needed
```

_Request Body_

```
{
    "fullName" : <full_name>,
    "email" : <email>,
    "password": <password>
    "confirmPassword": <confirm_password>
}
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success Create User"
}
```

_Response (400 - User Already Exist)_

```
{
    "message": "User Already Exist"
}
```

_Response (400 - Validation Error)_

```

{
    "message": "_/fullName_/ min length 3 and required"
}

```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### POST /api/user/forgot-password

> Post Forgot Password User

_Request Header_

```
don't needed
```

_Request Body_

```
{
    "email" : <email>,

}
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success Forgot Password User"
    "token" : <token_reset_password>
}
```

_Response (404 - User not found)_

```
{
    "message": "User not found"
}
```

_Response (400 - Validation Error)_

```

{
    "message": "_/fullName_/ min length 3 and required"
}

```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### PUT /api/user/user-password/:token

> PUT Forgot Password User

_Request Header_

```
don't needed
```

_Request Params_

```
 {
    "token" : <reset_password_token>
 }
```

_Request Body_

```
{
    "password" : <password>,
    "confirmPassword" : <confirmPassword>,

}
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success Update Password User"
}
```

_Response (404 - User not found)_

```
{
    "message": "User not found"
}
```

_Response (400 - Validation Error)_

```

{
    "message": "_/password_/ min length 3 and required"
}

```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### PUT /api/user/user-profile/:id

> PUT Profile User

_Request Header_

```
{
    "Authorization" : "Bearer <token_user>"
}
```

_Request Params_

```
 {
    "token" : <reset_password_token>
 }
```

_Request Body_

```
{
    "fullName" : <fullName>,
    "email" : <email>,

}
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success Update Profile User"
}
```

_Response (404 - User not found)_

```
{
    "message": "User not found"
}
```

_Response (400 - Validation Error)_

```

{
    "message": "_/email_/ min length 3 and required"
}

```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### PUT /api/user/user-role/:id

> PUT Role User

_Request Header_

```
{
    "Authorization" : "Bearer <token_admin>"
}
```

_Request Params_

```
 {
    "id" : <user_id>
 }
```

_Request Body_

```
{
    "roleId" : <role_id>,
}
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success Update Role User"
}
```

_Response (404 - User not found)_

```
{
    "message": "User not found"
}
```

_Response (400 - Validation Error)_

```

{
    "message": "_/roleId_/ min length 3 and required"
}

```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

> GET Users

_Request Header_

```
{
    "Authorization" : "Bearer <token_admin>"
}
```

_Request Params_

```
dont needed
```

_Request Body_

```
don't needed
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success Get User"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### GET /api/user/

> GET Role User

_Request Header_

```
{
    "Authorization" : "Bearer <token_admin>"
}
```

_Request Params_

```
    don't needed
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success GET User"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### GET /api/user/:id

> GET User by Id

_Request Header_

```
{
    "Authorization" : "Bearer <token_admin>"
}
```

_Request Params_

```
{
    "id": <user_id>
}
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success GET User"
}
```

_Response (404 - User not found)_

```
{
    "message": "User not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### DELETE /api/user/:id

> DELETE User by Id

_Request Header_

```
{
    "Authorization" : "Bearer <token_admin>"
}
```

_Request Params_

```
{
    "id": <user_id>
}
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success DELETE User"
}
```

_Response (404 - User not found)_

```
{
    "message": "User not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

## TRANSACTION API

### POST /api/transaction/:id

> Post Create Transaction

_Request Header_

```
{
    "Authorization" : Bearer <token_user>
}
```

_Request Body_

```
    don't needed
```

_Response (201)_

```
{
    "data": {transaction : <transaction_data>, payment: <payment_data>},
    "status": "Success Create Transaction"
}
```

_Response (403 - Unauthorized)_

```
{
    "message": "User has been registered on this course"
}
```

_Response (404 - Data Not Found)_

```
{
    "message": "Data Not Found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### PUT /api/transaction/:token

> PUT Update Status Transaction

_Request Header_

```
{
    "Authorization" : Bearer <token_user>
}
```

_Request Body_

```
    don't needed
```

_Response (201)_

```
{
    "data": {<data_transaction>},
    "status": "Success Update status Transaction"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

## COURSE API

### POST /api/course/register-participant/:id

> Post

_Request Header_

```
{
    "Authorization" : Bearer <token_user>
}
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<Participants>},
    "status": "Success Daftar User"
}
```

_Response (404 - Data Not Found)_

```
{
    "message": "Data Not Found"
}
```

_Response (400 - This user has'nt paid )_

```
{
    "message": "This user has'nt paid "
}
```

_Response (400 - This user already registered on this course)_

```
{
    "message": "This user already registered on this course"
}
```

_Response (400 - Particpants Full)_

```
{
    "message": "Participants Full"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### POST /api/courses/

> Post Create New Course

_Request Header_

```
{
    "Authorization" : Bearer <token_admin>
}
```

_Request Body_

```
    {
      "title" : <course_title>,
      "description" : <course_description>,
      "qualified" : <course_qualified>,
      "instructor_id" : <instructor_id>,
      "category_id" : <category_id>,
      "start_date" : <course_start_date>,
      "end_date" : <course_end_date>,
      "max_participants" : <course_max_participants>,
      "price" : <course_price>,
      "image" : <course_file_image>,
    }
```

_Response (200)_

```
{
    "data": {<data_course>},
    "status": "Success Create Course"
}
```

_Response (400 - Validation Error)_

```

{
    "message": "_/title_/ min length 3 and required"
}

```

_Response (400 - Title Already Used)_

```
{
    "message": "Title Already Used"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### PUT /api/courses/update-course/:id

> PUT Update Course

_Request Header_

```
{
    "Authorization" : Bearer <token_admin>
}
```

_Request Params_

```
{
    "id" : <course_id>
}
```

_Request Body_

```
    {
      "title" : <course_title>,
      "description" : <course_description>,
      "qualified" : <course_qualified>,
      "instructor_id" : <instructor_id>,
      "category_id" : <category_id>,
      "start_date" : <course_start_date>,
      "end_date" : <course_end_date>,
      "max_participants" : <course_max_participants>,
      "price" : <course_price>,
    }
```

_Response (200)_

```
{
    "data": {<data_course>},
    "status": "Success Update Course"
}
```

_Response (400 - Validation Error)_

```

{
    "message": "_/title_/ min length 3 and required"
}

```

_Response (400 - Title Already Used)_

```
{
    "message": "Title Already Used"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### PUT /api/courses/update-image/:id

> PUT Update Image Course

_Request Header_

```
{
    "Authorization" : Bearer <token_admin>
}
```

_Request Params_

```
{
    "id" : <course_id>
}
```

_Request Body_

```
    {
      "image" : <file_image_course>
    }
```

_Response (200)_

```
{
    "data": {<data_course>},
    "status": "Success Update Image Course"
}
```

_Response (400 - Validation Error)_

```

{
    "message": "_/image_/ is required"
}

```

_Response (404 - Course not found)_

```
{
    "message": "Course not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### GET /api/courses/:id

> GET Course by Id

_Request Header_

```
 don't needed
```

_Request Params_

```
{
    "id": <course_id>
}
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success GET User"
}
```

_Response (404 - Course not found)_

```
{
    "message": "Course not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### GET /api/courses

> GET Courses

_Request Header_

```
    don't needed
```

_Request Params_

```
    dont't needed
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success GET User"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### GET /api/courses/my-course

> GET Course by Id

_Request Header_

```
 {
    "Authorization" : Bearer <token_user>
 }
```

_Request Params_

```
    don't needed
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<Data_My_course>},
    "status": "Success Get My Course"
}
```

_Response (404 - Course not found)_

```
{
    "message": "Course not found"
}
```

_Response (403 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### DELETE /api/courses/:id

> DELETE Course by Id

_Request Header_

```
{
    "Authorization" : "Bearer <token_admin>"
}
```

_Request Params_

```
{
    "id": <course_id>
}
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success DELETE User"
}
```

_Response (404 - User not found)_

```
{
    "message": "User not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

## INSTRUCTOR API

### GET /api/instructor

> GET Instructors

_Request Header_

```
{
    "Authorization" : Bearer <token_admin>
}
```

_Request Params_

```
    dont't needed
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<data_instructors>},
    "status": "Success GET Instructors"
}
```

_Response (403 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

## COURSE CATEGORY API

### POST /api/course-category/

> Post Course Category

_Request Header_

```
{
    "Authorization" : Bearer <token_admin>
}
```

_Request Body_

```
{
    "name" : <course_category_name>,
}
```

_Response (200)_

```
{
    "data": {<data_category>},
    "status": "Success Create Category"
}
```

_Response (403 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (400 - Category Already Exist)_

```
{
    "message": "Category Already Exist"
}
```

_Response (400 - Validation Error)_

```
{
    "message": "*_/name_*/ min length 3 and required"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### PUT /api/course-category/:id

> PUT Course Category

_Request Header_

```
{
    "Authorization" : Bearer <token_admin>
}
```

_Request Body_

```
{
    "name" : <course_category_name>,
}
```

_Response (201)_

```
{
    "data": {<data_category>},
    "status": "Success Update Category"
}
```

_Response (404 - Category Not Found)_

```
{
    "message": "Category Not Found"
}
```

_Response (400 - Category Already Exist)_

```
{
    "message": "Category Already Exist"
}
```

_Response (403 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (400 - Validation Error)_

```
{
    "message": "*_/name_*/ min length 3 and required"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### GET /api/course-category

> GET Course Categories

_Request Header_

```
    don't needed
```

_Request Params_

```
    dont't needed
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<data_instructors>},
    "status": "Success GET Instructors"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### GET /api/course-category/:id

> GET Course Category

_Request Header_

```
    don't needed
```

_Request Params_

```
{
    "id" : <course_category_id>
}
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {<data_instructors>},
    "status": "Success GET Instructors"
}
```

_Response (404 - Course Category Not Found)_

```
{
    "message": "Course Category Not Found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### DELETE /api/course-category/:id

> DELETE Course Category by Id

_Request Header_

```
{
    "Authorization" : "Bearer <token_admin>"
}
```

_Request Params_

```
{
    "id": <course_category_id>
}
```

_Request Body_

```
    don't needed
```

_Response (200)_

```
{
    "data": {},
    "status": "Success DELETE Course Category"
}
```

_Response (404 - Category not found)_

```
{
    "message": "Category not found"
}
```

_Response (403 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```
