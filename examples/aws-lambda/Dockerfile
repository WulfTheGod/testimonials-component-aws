FROM public.ecr.aws/lambda/nodejs:18

# Copy source code
COPY handler.ts tsconfig.json package*.json ./
COPY ../../src ./src

# Install dependencies and build
RUN npm install
RUN npm run build

# Set the CMD to your handler
CMD [ "handler.handler" ]