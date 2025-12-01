// deno-lint-ignore-file react-no-danger
import { type PageProps } from "$fresh/server.ts";
import { env } from "../config/env.ts";

export default function App({ Component }: PageProps) {
  const gaId = env.gaId;
  const laId = env.laId;

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HaloLight</title>
        <link rel="stylesheet" href="/styles.css" />

        {/* 51.la 统计 */}
        {laId && (
          <script
            id="LA_COLLECT"
            src={`https://web.51.la/go?id=${laId}`}
            defer
          />
        )}

        {/* Google Analytics */}
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            {/* deno-lint-ignore react-no-danger */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
