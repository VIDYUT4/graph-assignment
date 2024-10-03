# hierarchy Graph project -

# Graph Project

This project consists of a front end and back end for a hierarchy graph dashboard. In the frontend part we can see a hierarchy graph on dashboard. When we will click on any node of graph it will represent the information for that node using popup. This dashboard is built with D3 and Vue 3, powered by Vite.
while the back end is a Node.js Express application with MongoDB.

#### Note: For more details about the Frontend or Backend, please refer to their respective `README.md` files in their root directories.

## Front End

### Overview

The front end is a graph dashboard built with D3 and Vue 3. It provides an interactive and dynamic user interface for visualizing graph data.

### Recommended IDE Setup

For an optimal development experience, we recommend using [VSCode](https://code.visualstudio.com/) with the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension. Make sure to disable Vetur to avoid conflicts.

### Customize Configuration

For details on configuring Vite, refer to the [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/VIDYUT4/graph-assignment.git
   cd graph-assignment/frontend-Vue
   ```

2. **Install Dependencies**

   To install the necessary dependencies, run:

   ```sh
   npm install
   ```

3. **Start Development Server**

To start a development server with hot-reloading, use:

```
npm run dev
```

4. **Build for Production**

To build the project for production, run:

```
npm run build
```

5. **Run Unit Tests with Vitest**

To execute unit tests and check coverage, use:

```
npm run test:unit
```

## Back End

### Overview

The back end is a Node.js Express application designed to serve graph data from a MongoDB database. It provides a robust API for interacting with and retrieving graph-related data.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/VIDYUT4/graph-assignment.git
   cd graph-assignment/backend-node-express
   ```

2. **Install Dependencies**

   To install the necessary dependencies, run:

```sh
npm install
```

3. **Set Up Environment Variables**

Create a `.env` file in the root of the project and define the following environment variables:

```bash
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.pe2wn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

```

4. **Seed the Database**

To populate the database with sample graph data, run:

```sh
npm run seed
```

5. **Start the Dev Server**

To start the development server, run:

```sh
npm start
```

### 6. Testing

To run the tests for this project, you can use the following commands:

- **Running Unit Tests**: To run the unit tests, use the following command:
 
```sh
npm run test
```

## License

This project is licensed under the MIT License.

## Author

This project was created by Bidyut Biswas. Feel free to reach out if you have any questions or suggestions. Happy Coding :)


