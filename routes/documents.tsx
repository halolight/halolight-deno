/**
 * 文档管理页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
} from "../components/ui/index.ts";
import { Avatar } from "../components/ui/Avatar.tsx";

const documents = [
  {
    id: "1",
    title: "产品需求文档 v2.0",
    description: "2024年Q1产品迭代需求说明",
    type: "doc",
    size: "2.4 MB",
    updatedAt: "2024-03-15",
    updatedBy: "张三",
    status: "published",
  },
  {
    id: "2",
    title: "技术架构设计",
    description: "系统架构设计方案和技术选型",
    type: "doc",
    size: "1.8 MB",
    updatedAt: "2024-03-14",
    updatedBy: "李四",
    status: "draft",
  },
  {
    id: "3",
    title: "用户调研报告",
    description: "2024年2月用户访谈总结",
    type: "pdf",
    size: "5.2 MB",
    updatedAt: "2024-03-12",
    updatedBy: "王五",
    status: "published",
  },
  {
    id: "4",
    title: "市场分析报告",
    description: "竞品分析和市场趋势",
    type: "xlsx",
    size: "3.1 MB",
    updatedAt: "2024-03-10",
    updatedBy: "赵六",
    status: "review",
  },
  {
    id: "5",
    title: "项目周报",
    description: "第12周项目进度汇报",
    type: "doc",
    size: "0.8 MB",
    updatedAt: "2024-03-08",
    updatedBy: "张三",
    status: "published",
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "doc":
      return (
        <svg
          className="h-8 w-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    case "pdf":
      return (
        <svg
          className="h-8 w-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    case "xlsx":
      return (
        <svg
          className="h-8 w-8 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="h-8 w-8 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
  }
};

export default function DocumentsPage() {
  return (
    <>
      <Head>
        <title>文档管理 - HaloLight</title>
        <meta name="description" content="管理您的文档和文件" />
      </Head>
      <Layout title="文档管理" showSidebar>
        <div className="space-y-6">
          {/* 标题和操作 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                文档管理
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                共 {documents.length} 个文档
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                上传文档
              </Button>
              <Button variant="primary">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                新建文档
              </Button>
            </div>
          </div>

          {/* 搜索和筛选 */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="搜索文档..."
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                    <option value="">所有类型</option>
                    <option value="doc">文档</option>
                    <option value="pdf">PDF</option>
                    <option value="xlsx">表格</option>
                  </select>
                  <select className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                    <option value="">所有状态</option>
                    <option value="draft">草稿</option>
                    <option value="review">审核中</option>
                    <option value="published">已发布</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 文档列表 */}
          <div className="grid gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {doc.title}
                        </h3>
                        <Badge
                          variant={doc.status === "published"
                            ? "success"
                            : doc.status === "review"
                            ? "warning"
                            : "secondary"}
                          size="sm"
                        >
                          {doc.status === "published"
                            ? "已发布"
                            : doc.status === "review"
                            ? "审核中"
                            : "草稿"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                        {doc.description}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>{doc.size}</span>
                        <span>·</span>
                        <span>{doc.updatedAt}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Avatar name={doc.updatedBy} size="xs" />
                          {doc.updatedBy}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 分页 */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              显示 1-{documents.length} 共 {documents.length} 条
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="outline" size="sm" disabled>
                下一页
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
