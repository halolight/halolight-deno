/**
 * 登录页面路由
 */

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import LoginForm from "../islands/LoginForm.tsx";
import { getMetaTags } from "../config/tdk.ts";

interface LoginPageData {
  demoEmail: string;
  demoPassword: string;
  showDemoHint: boolean;
}

export const handler: Handlers<LoginPageData> = {
  GET(_req, ctx) {
    const demoEmail = Deno.env.get("DEMO_EMAIL") ?? "";
    const demoPassword = Deno.env.get("DEMO_PASSWORD") ?? "";
    const showDemoHint = Deno.env.get("SHOW_DEMO_HINT") === "true";

    return ctx.render({
      demoEmail,
      demoPassword,
      showDemoHint,
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
