# Hacker News API -- OpenAPI Spec

Simple OpenAPI spec for the HN API to do strongly typed code generation off of. 

Spec: https://raw.githubusercontent.com/andenacitelli/hacker-news-api-openapi/main/exports/api.yaml

- Based off the original API here: https://github.com/HackerNews/API
- Built with [zod](https://github.com/colinhacks/zod) schemas and exported to OpenAPI via [@asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi). Rebuilt in a pre-commit hook, nothing else needed.
- End result is validated with [Redocly CLI](https://redocly.com/docs/cli) and a few basic tests that make real HN calls to validate the schemas.

## Contributing

Please raise issues and I'm happy to fix.

## Funding

If you appreciate the work I do, please feel free to buy me a coffee through [GitHub Sponsors](https://github.com/sponsors/andenacitelli) or [Ko-Fi](https://ko-fi.com/andenacitelli).

## License

MIT