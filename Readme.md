C:\Program Files\MongoDB\Server\5.0\bin

ngrok http 3000

//ABOUT THE APP:

This is a student Time Logger that registers and records students attendance.It records all entry and exits of students, time duration of students on a particular date and within dates range, and all this can be accesed through a specified endpoint/url 

//ROUTES/ENDPOINTS//

Authentication Routes
1. To register a user
 http://localhost:3000/auth/register

 By passing (POST) username, email and password on the request body eg.{"username": "sani", "email": "jj@gmail.com" "password": "sani@123"}
 No need for authorization  

2. To login
http://localhost:3000/auth/login

 By passing (POST) name and password on the request body eg.{"username": "sani", "password": "sani@123"}  

3. To get the list of all registered Users 
 http://localhost:3000/auth/users
   Use GET/Reguest

 By sending GET/Request   

4. To update users detail
http://localhost:3000/auth/users/id    
By sending PUT/Request in the request header and username, password or email(any of them you want to change) as a json object  

5. To delete a user
http://localhost:3000/auth/users/id    
By sending delete/Request with the user id in the request header   


Students Routes
1. creat new Student endpoint
 http://localhost:3000/students

 By passing(POST) name as a Json file eg. {"name": "Adamu Azarema"}

2. To get the list of all Students
 http://localhost:3000/students
 Use GET/Reguest

3. To update a student record
 http://localhost:3000/students/id
 Use PUT/Reguest and the student id on the request header

4. To delete a student
 http://localhost:3000/students/id
 Use DELETE/Reguest and the student id on the request header 
  
Attendance Routes
1. Entry endpoint
 http://localhost:3000/attendance/entry

 posting studentId as a json (POST) eg. {"studentId": "6463696201f50ce11682d066"}

2. Exit endpoint
 http://localhost:3000/attendance/exit

 posting studentId as a json (POST)eg. {"studentId": "6463696201f50ce11682d066"}

3. Endpoint for getting entry-time for a particular day for a student
To check entry-time end point use /attendance/entry-time?studentId=<studentId>&date=<date>
eg. http://localhost:3000/attendance/entry-time?studentId=6463696201f50ce11682d066&date=2023-05-16

Use the url as a query parameter on the (GET) request header and add the JWT token received during login to 
the Bearer under Authentication key.

4. Endpoint for getting entry,exit time and total hrs,mins and secs stayed by a student from one date to another
To check use end point  /attendance/total-time?studentId=<studentId>&startDate=<date>endDate<date>
eg. http://localhost:3000/attendance//total-time?studentId=6465087a45ec9372f1494390&startDate=2023-05-16&endDate=2023-05-17

Use the url as a query parameter on the (GET) request header and add the JWT token received during login to 
the Bearer under Authentication key.

5. Endpoint for getting entry,exit time and total hrs,mins and secs stayed by all the students from one date to another
To check entry-time end point use /attendance/all-total-time?studentId=<studentId>&date=<date>
eg. http://localhost:3000/attendance/all-total-time?startDate=2023-05-16&endDate=2023-05-17

Use the url as a query parameter on the (GET) request header and add the JWT token received during login to 
the Bearer under Authentication key.

