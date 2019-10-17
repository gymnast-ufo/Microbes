import { scriptAlias } from './alias';

const PATH = {
  watch: {
    images: `src/img/**/*.*`,
  	sass: `src/**/*.sass`,
    scripts: `src/**/*.js`
  },
  src: {
    images: `src/img/**/*.*`,
  	sass: `src/**/index.sass`,
    scripts: scriptAlias.map(name => `src/${name}`),
  },
  dest: {
    images: `build/img/`,
  	sass: `build/css/`,
    scripts: `build/js/`
  }
};

export default PATH;