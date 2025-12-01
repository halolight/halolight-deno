/**
 * 忘记密码页面路由
 */

import { Head } from "$fresh/runtime.ts";
import ForgotPasswordForm from "../islands/ForgotPasswordForm.tsx";
import { getMetaTags } from "../config/tdk.ts";

export default function ForgotPasswordPage() {
  const meta = getMetaTags("/forgot-password");

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <ForgotPasswordForm />
    </>
  );
}
