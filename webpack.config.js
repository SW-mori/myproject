//CSSを外部ファイルとして出力するために必要なプラグイン
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const globule = require('globule');
const HtmlWebpackPlugin = require('html-webpack-plugin');


let rules = [

  {
    test: /\.(html)$/,
    use: {
      loader: 'html-loader',
    }
  },

  {
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

  {
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { url: true }
      },
      'sass-loader',
    ]
  },

  {
    test: /\.(png|jpg|gif|ico)$/i,
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
  //バンドル対象のファイル
  entry: {
    main: './src/js/main.js',
  },
  
  mode:"development",

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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
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