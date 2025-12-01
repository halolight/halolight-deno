/**
 * 登录页面路由
 */

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import LoginForm from "../islands/LoginForm.tsx";
import { getMetaTags } from "../config/tdk.ts";
import { env } from "../config/index.ts";

interface LoginPageData {
  demoEmail: string;
  demoPassword: string;
  showDemoHint: boolean;
}

export const handler: Handlers<LoginPageData> = {
  GET(_req, ctx) {
    return ctx.render({
      demoEmail: env.demoEmail,
      demoPassword: env.demoPassword,
      showDemoHint: env.showDemoHint,
    });
  },
};

export default function LoginPage({ data }: PageProps<LoginPageData>) {
  const meta = getMetaTags("/login");

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <LoginForm
        demoEmail={data.demoEmail}
        demoPassword={data.demoPassword}
        showDemoHint={data.showDemoHint}
      />
    </>
  );
}
