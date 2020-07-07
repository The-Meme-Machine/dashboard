const express = require('express');

const os = require('os');
const utils = require('os-utils');
const si = require('systeminformation');

const memory = os.totalmem();

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    arch: os.arch(),
    cpu: os.cpus(),
    network: os.networkInterfaces(),
    platform: os.platform(),
    sysUptime: utils.sysUptime(),
    processUptime: utils.processUptime(),
    memory: memory / 1000000000
  })
})

router.get('/detail', (req, res) => {
  si.get({
    cpu: 'manufacturer, brand, speed, speedmax, cores, physicalCores, cache',
    system: 'manufacturer, model',
    osInfo: 'platform, arch, distro, release',
    mem: 'total',
    memLayout: '*',
    graphics: '*',
    battery: '*',
    diskLayout: '*'
  }, (data) => {
    res.send(data)
  })
})

router.get('/static', (req, res) => {
  si.getStaticData(data => res.send(data))
})

router.get('/dynamic', (req, res) => {
  si.getDynamicData(data => res.send(data))
})

router.get('/latency', (req, res) => {
  si.inetLatency().then(data => res.send(data));
})

module.exports = router;