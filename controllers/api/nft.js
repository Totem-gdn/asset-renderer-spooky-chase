'use strict'

const nftHelper = require('../../helpers/dna-parser')

class NFTController {
  async get (req, res, next) {
    const { type, id } = req.params
    const { width = 200, height = 200 } = req.query
    if (!type || !id) {
      res.status(404).json({ error: 'Wrong format' })
    }
    if (type === 'avatar') {
      const nft = await nftHelper.get(type, id);
      nft['glow_color'] = nft.primary_color.replace(')', ', 0.5)').replace('rgb', 'rgba');

      if (nft.human_hair_color === '#b1b1b1') {
        nft['haircolor'] = '1';
      }
      if (nft.human_hair_color === '#070504') {
        nft['haircolor'] = '2';
      }
      if (nft.human_hair_color === '#341c0d' || nft.human_hair_color === '#62422e') {
        nft['haircolor'] = '3';
      }
      if (nft.human_hair_color === '#914329' || nft.human_hair_color === '#cd622b') {
        nft['haircolor'] = '4';
      }
      if (nft.human_hair_color === '#ad7b41' || nft.human_hair_color === '#e4b877') {
        nft['haircolor'] = '5';
      }


      if (nft.human_skin_color === '#f9d4ab' || nft.human_skin_color === '#efd2c4' || nft.human_skin_color === '#e2c6c2' || nft.human_skin_color === '#e0d0bb') {
        nft['bodycolor'] = '1';
      }
      if (nft.human_skin_color === '#ebb77d' || nft.human_skin_color === '#dca788' || nft.human_skin_color === '#cda093' || nft.human_skin_color === '#ccab80') {
        nft['bodycolor'] = '2';
      }
      if (nft.human_skin_color === '#c58351' || nft.human_skin_color === '#b37652' || nft.human_skin_color === '#81574b' || nft.human_skin_color === '#8a6743') {
        nft['bodycolor'] = '3';
      }
      if (nft.human_skin_color === '#7a3e10' || nft.human_skin_color === '#5c2a19' || nft.human_skin_color === '#472422' || nft.human_skin_color === '#362714') {
        nft['bodycolor'] = '4';
      }
      console.log('nft', nft);

      res.setHeader('Content-Type', 'image/svg+xml');
      res.render(`layouts/${type}.hbs`, {
        layout: `${type}.hbs`,
        ...nft,
        width: width,
        height: height
      })
    } else {
      res.status(404).json({ error: 'File not found' })
    }
  }
}

module.exports = new NFTController()
