/**
 * 重置密码页面路由
 */

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import ResetPasswordForm from "../islands/ResetPasswordForm.tsx";
import { getMetaTags } from "../config/tdk.ts";

interface ResetPasswordPageData {
  token: string | null;
}

export const handler: Handlers<ResetPasswordPageData> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    return ctx.render({ token });
  },
};

export default function ResetPasswordPage(
  { data }: PageProps<ResetPasswordPageData>,
) {
  const meta = getMetaTags("/reset-password");

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <ResetPasswordForm token={data.token} />
    </>
  );
}
