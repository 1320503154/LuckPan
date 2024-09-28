/** @type {import('next').NextConfig} */
const nextConfig = {
	// 配置输出为静态导出
	output: "export",
	// 配置导出路径映射
	exportPathMap: async function (
		defaultPathMap,
		{ dev, dir, outDir, distDir, buildId }
	) {
		return {
			// 配置根路径
			"/": { page: "/" },
			// 其他页面的配置
		};
	},
};

export default nextConfig;
