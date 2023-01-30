#here we're specifying the version of node
#we can use the :latest tag as well.
FROM node:16.13.2

#here we're defining the working directory
WORKDIR /user/src/app

#copying our dependencies to the container
COPY ./package.json ./

#installing all the dependencies that we copied 
RUN npm install


#copying all the files inside the container
COPY . .

#exposing the port so we can access it further
EXPOSE 5000

#starting the server
CMD ["npm", "run", "dev"]