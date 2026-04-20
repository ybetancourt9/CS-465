# Travlr Full Stack Application

This project is a full stack web application for Travlr Getaways. It includes a customer-facing website built with Express, Handlebars, HTML, CSS, and JavaScript, along with an Angular single-page application for the administrator side. The backend uses Node.js, Express, MongoDB, and Mongoose to manage trip data and support REST API endpoints. In the final stage of the project, security was added with login authentication and JWT-protected admin actions.

## Architecture

For the frontend, I used two different approaches. The customer-facing side uses Express with Handlebars templates, which follows a more traditional web application pattern where the server renders the page and sends it to the browser. This worked well for the public site because it kept the structure simple and matched the original wireframe. The administrative side uses Angular as a single-page application. Instead of reloading the whole page each time, Angular updates the screen dynamically and uses components, services, and routing to manage the interface. The SPA gave the admin side richer functionality for working with trips, editing records, and logging in.

The backend used a NoSQL MongoDB database because the trip data fits well into flexible JSON-like documents. MongoDB also works naturally with JavaScript and Mongoose, which made it easier to define schemas, seed the database, and connect the frontend and backend. Since the trip objects all share similar fields but still benefit from a document-based structure, MongoDB was a good fit for this project.

## Functionality

JSON is different from JavaScript because JSON is a text-based format for structuring and exchanging data, while JavaScript is a programming language. In this project, JSON helped tie the frontend and backend together because the API returned trip data as JSON, Angular read that data and displayed it, and the backend stored similar structured data in MongoDB. JSON acted as the common format shared between the browser, server, and database.

There were several points in the project where code was refactored to improve efficiency and functionality. The original static HTML pages were moved into Handlebars templates so the site could render shared layout pieces and dynamic trip data more cleanly. The backend database logic was also separated into `app_api` so the API routes and controllers were no longer mixed into the public site logic. On the Angular side, the trip display was refactored into a reusable `trip-card` component, and the admin form logic was reused across separate `add-trip` and `edit-trip` components. Reusable UI components make the code easier to maintain, reduce duplication, and make updates more consistent because one change can improve multiple screens at once.

## Testing

In a full stack application, methods are the HTTP actions such as GET, POST, PUT, and DELETE, while endpoints are the URL paths that those actions are sent to, such as `/api/trips` or `/api/login`. Security adds another layer because some endpoints should be public and some should require authorization. In this project, GET endpoints were used to retrieve trip data for the public site and the admin SPA, while POST, PUT, and DELETE were used for admin functions. After security was added, the protected admin endpoints required a valid JWT in the request header.

Testing involved both the browser and Postman. In Angular, I tested that trips loaded correctly from the API and displayed on the admin page. I also tested editing a trip to confirm that the PUT request updated the record in MongoDB and that the changes appeared in both the SPA and the public website. In Postman, I tested API routes directly to confirm that endpoints returned JSON, that requests without a valid token were rejected with a 401 response, and that protected requests worked correctly when the token was included. This helped confirm that the request methods, endpoints, and security layer were working together correctly.

## Reflection

This course helped me better understand how all parts of a full stack web application work together. Before this project, I had less experience connecting the frontend, backend, database, and security layers into one application. Working through the full project helped me see how each part depends on the others and how important it is to build and test each layer carefully.

I developed skills in Express routing, MVC structure, Handlebars templating, MongoDB and Mongoose, REST API development, Angular components and services, and JWT-based authentication. I also got more practice with debugging, refactoring, and testing with Postman. These are valuable skills because they apply directly to modern web development and make me a stronger candidate for roles involving software development, web applications, or full stack engineering.
