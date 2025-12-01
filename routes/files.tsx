/**
 * 文件管理页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import { Button, Card, CardContent, Input } from "../components/ui/index.ts";

const files = [
  {
    id: "1",
    name: "产品截图",
    type: "folder",
    items: 24,
    size: "128 MB",
    updatedAt: "2024-03-15",
  },
  {
    id: "2",
    name: "设计稿",
    type: "folder",
    items: 15,
    size: "256 MB",
    updatedAt: "2024-03-14",
  },
  {
    id: "3",
    name: "logo-dark.png",
    type: "image",
    size: "2.4 MB",
    updatedAt: "2024-03-12",
  },
  {
    id: "4",
    name: "logo-light.png",
    type: "image",
    size: "2.1 MB",
    updatedAt: "2024-03-12",
  },
  {
    id: "5",
    name: "产品演示.mp4",
    type: "video",
    size: "156 MB",
    updatedAt: "2024-03-10",
  },
  {
    id: "6",
    name: "用户手册.pdf",
    type: "pdf",
    size: "8.5 MB",
    updatedAt: "2024-03-08",
  },
  {
    id: "7",
    name: "数据备份.zip",
    type: "archive",
    size: "512 MB",
    updatedAt: "2024-03-05",
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return (
        <svg
          className="h-10 w-10 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
        </svg>
      );
    case "image":
      return (
        <svg
          className="h-10 w-10 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    case "video":
      return (
        <svg
          className="h-10 w-10 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      );
    case "pdf":
      return (
        <svg
          className="h-10 w-10 text-red-600"
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
    case "archive":
      return (
        <svg
          className="h-10 w-10 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="h-10 w-10 text-gray-400"
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

export default function FilesPage() {
  return (
    <>
      <Head>
        <title>文件管理 - HaloLight</title>
        <meta name="description" content="管理您的文件和媒体资源" />
      </Head>
      <Layout title="文件管理" showSidebar>
        <div className="space-y-6">
          {/* 标题和操作 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                文件管理
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                管理您的文件和媒体资源
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
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                新建文件夹
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                上传文件
              </Button>
            </div>
          </div>

          {/* 面包屑导航 */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <nav className="flex items-center gap-2 text-sm">
                  <a
                    href="/files"
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    我的文件
                  </a>
                </nav>
                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="搜索文件..."
                    className="w-64"
                  />
                  <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg border-r border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
                    >
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
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg"
                    >
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
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 文件网格 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file) => (
              <Card
                key={file.id}
                className="cursor-pointer hover:shadow-md transition-shadow group"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 relative">
                      {getFileIcon(file.type)}
                      {file.type === "folder" && (
                        <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {file.items}
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white truncate w-full text-sm">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {file.size}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {file.updatedAt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 存储使用情况 */}
          <Card className="mt-8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    存储空间
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    已使用 2.5 GB / 10 GB
                  </p>
                </div>
                <div className="flex-1 mx-8">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "25%" }}
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  升级存储
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}
