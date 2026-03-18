import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:       resolve(__dirname, 'index.html'),
        tarihce:    resolve(__dirname, 'pages/tarihce.html'),
        akademi:    resolve(__dirname, 'pages/akademi.html'),
        kampus:     resolve(__dirname, 'pages/kampus.html'),
        teknokent:  resolve(__dirname, 'pages/teknokent.html'),
        mezunlar:   resolve(__dirname, 'pages/mezunlar.html'),
        siralamalar: resolve(__dirname, 'pages/siralamalar.html'),
      },
    },
  },
})
