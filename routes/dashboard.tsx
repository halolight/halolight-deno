/**
 * 仪表盘页面路由
 */

import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import Dashboard from "../islands/Dashboard.tsx";
import { getMetaTags } from "../config/tdk.ts";

export default function DashboardPage() {
  const meta = getMetaTags("/dashboard");

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <Layout title="仪表盘" showSidebar>
        <Dashboard />
      </Layout>
    </>
  );
}
