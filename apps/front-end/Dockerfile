# Use the official Bun image to run the application
FROM oven/bun:latest

# Copy the package.json into the container
COPY package.json ./

# Install the dependencies
RUN bun install

# Copy the rest of the application into the container
COPY . .

# Build the application
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["bun", "run", "start"]