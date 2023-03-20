# URL Summary Generator

This project is a URL summary generator that utilizes the OpenAI API to create a short and general summary of a given URL. It parses the web page content and generates a summary based on the extracted text.

## Dependencies

@mozilla/readability: A library to extract readable content from HTML.
gpt-3-encoder: A library to count tokens in a GPT-3 prompt.
jsdom: A JavaScript implementation of the DOM and HTML standards.
openai: The official OpenAI API client library for JavaScript.
pino: A fast and low-overhead logging library for Node.js.
string-strip-html: A library to strip HTML tags and other content from strings.

## Environment Variables

This project uses the following environment variables for configuration. Make sure to set these variables before running the project.

`OPENAI_API_KEY`: The API key for accessing the OpenAI API. You can obtain this key from the OpenAI Dashboard. \
`LOG_LEVEL`: The logging level for the application. Valid values are: trace, debug, info, warn, error, fatal, and silent. Default value is info. \
`OPENAI_MAX_TOKENS`: The maximum number of tokens the OpenAI API should generate in response to a prompt. Default value is recommended based on the model used. \
`OPENAI_TEMPERATURE`: The sampling temperature for the OpenAI API. Higher values (e.g., 1) produce more random output, while lower values (e.g., 0) produce more deterministic output. Default value is 0.7. \
`URL`: The URL of the article you want to summarize. This variable should be passed when calling the getSummaryByURL function. Use this environment variable only in CLI applications

## Usage

The main functionality is provided by the getSummaryByURL function. It takes a URL and optional parameters for the OpenAI API as input and returns a summary of the page.

## Example

```javascript
import { getSummaryByURL } from 'ai-summarize-url'

const summary = 'https://www.nationalgeographic.com/environment/article/seaweed-blob-great-atlantic-sargassum-belt-beach-threat'

const summary = await getSummaryByURL(url)

//"The Great Atlantic Sargassum Belt is a 5,000 mile long mass of floating seaweed that is heading towards the tip of Florida. It provides a home and source of food for passing fish and sea turtles, but in the past decade, it has become a nuisance capable of causing serious damage due to its stench and ability to smother coral reefs and mangroves. It is believed to have been caused by fertilizers from the Amazon River leaking into the ocean and giving the seaweed a boost. Removing it can cost tens of millions of dollars and there is not an easy fix for getting rid of it."
console.log(summary)
```

## Things to do

- [ ] Publish this application to to NPM
- [ ] Implement a basic integration tests for the interface
