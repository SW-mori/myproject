// CSSを外部ファイルとして出力するために必要なプラグイン
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const path = require('path');
const globule = require('globule');
const glob = require('globule');
// 出力オプションの指定
const MODE = "development";


let rules = [

  {
    // 対象となるファイルの拡張子
    test: /\.(html)$/,
    use: {
      loader: 'html-loader',
    }
  },

  {
    // 対象となるファイルの拡張子
    test: /\.pug$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'pug-loader',
        options: {
          pretty: true,
        }
      }
    ]
  },

  // Sassファイルの読み込みとコンパイル
  {
    // 対象となるファイルの拡張子
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    use: [
      // CSSファイルを書き出すオプションを有効にする
      {
        loader: MiniCssExtractPlugin.loader,
      },
      // CSSをバンドルするための機能
      {
        loader: 'css-loader',
        // オプションでCSS内のurl()メソッドの取り込みを許可する
        options: { url: true }
      },
      'sass-loader',
    ]
  },

  {
    //対象となるファイルの拡張子
    test: /\.(png|jpg|gif|ico|svg)$/i,
    generator: {
      filename: 'img/[name][ext][query]'
    },
    type: 'asset/resource'
  }
]

// es5がtrueのときバベル適用
if (process.env.es5) {
  rules.push (
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  )
}

const buildDefault = {

  mode: MODE,

  //バンドル対象のファイル
  entry: {
    main: './src/js/main.js',
  },

  devServer: {
    static: './dist/html',
    open: true
  },

  module: {
    rules: rules
  },

  resolve:{
    extensions: ['.js', '.json', '.scss', 'css'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    },
    roots: [path.resolve(__dirname, "src")],
  },

  // ファイルの出力設定
  output: {
    // 出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "js/[name].js"
  },

  plugins: [
		new WebpackWatchedGlobEntries(),

    // CSSファイルを外だしにするプラグイン
    new MiniCssExtractPlugin({
      // ファイル名の設定
      filename: 'css/[name].css'
    }),
  ],
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};

const pugFiles = globule.find('src/html/*.pug');
pugFiles.forEach((pug) => {
  const html = pug.split('/').slice(-1)[0].replace('.pug', '.html');

  // webpackの設定にある、pluginsに以下のプラグインインスタンスを入れる。
  buildDefault.plugins.push (
    new HtmlWebpackPlugin ({

      // distのファイル名
      filename: `${path.resolve(__dirname, 'dist', 'html')}/${html}`,

      // 自動的にバンドル対象のjsとcssを入れる。
      inject: 'body',

      // 対象のpugファイル
      template: pug,

      //圧縮するかどうかを決める
      minify: false 
    })
  )
});

module.exports = buildDefault;