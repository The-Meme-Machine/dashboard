<template>
  <div class="hardware">
    <h1>Hardware Info:</h1>
    <template v-if="hardware">
      <h1>{{`${hardware.system.manufacturer}'s ${hardware.system.model}`}}</h1>
      <div>
        <div class="cpu">
          <h2>
            <font-awesome-icon icon="microchip" />&nbsp;CPU
          </h2>
          <h3>{{`${hardware.cpu.manufacturer} ${hardware.cpu.brand} @ ${hardware.cpu.speed} GHz`}}</h3>
          <ul>
            <li>Clock Speed: {{hardware.cpu.speed}} GHz</li>
            <li>Processors: {{hardware.cpu.processors}}</li>
            <li>CPU Cores: {{hardware.cpu.cores}}</li>
            <li>Physical Cores: {{hardware.cpu.physicalCores}}</li>
            <li>Socket: {{hardware.cpu.socket}}</li>
            <li>L1 Cache: {{(hardware.cpu.cache.l1d + hardware.cpu.cache.l1i) / (1024 * 1024)}} MB</li>
            <li>L2 Cache: {{hardware.cpu.cache.l2 / (1024 * 1024)}} MB</li>
            <li>L3 Cache: {{hardware.cpu.cache.l3 / (1024 * 1024)}} MB</li>
          </ul>
        </div>
        <hr />
        <div class="ram">
          <h2>
            <font-awesome-icon icon="memory" />&nbsp;RAM
          </h2>
          <div v-for="bank in hardware.memLayout" :key="bank.bank">
            <h3>{{`${bank.manufacturer} ${bank.formFactor} @ ${bank.clockSpeed} MHz`}}</h3>
            <ul>
              <li>Clock Speed: {{bank.clockSpeed}} MHz</li>
              <li>Size: {{bank.size / (1024 * 1024)}} MB</li>
              <li>Voltage: {{bank.voltageConfigured}} V</li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="gpu">
          <h2>
            <font-awesome-icon icon="gamepad" />&nbsp;GPU
          </h2>
          <div v-for="gpu in hardware.graphics.controllers" :key="gpu.model">
            <h3>{{gpu.model}}</h3>
            <ul>
              <li>Bus: {{gpu.bus}}</li>
              <li>VRAM: {{gpu.vram}} MB</li>
              <li>Dynamic VRAM Allocation: {{gpu.vramDynamic}}</li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="display">
          <h2>
            <font-awesome-icon icon="desktop" />&nbsp;Displays
          </h2>
          <div v-for="display in hardware.graphics.displays" :key="display.model">
            <h3>{{`${display.connection} ${display.vendor} ${display.model}`}}</h3>
            <ul>
              <li>Main Monitor: {{display.main}}</li>
              <li>Resolution: {{`${display.resolutionx} × ${display.resolutiony}`}}</li>
              <li>Pixel Depth: {{display.pixeldepth}}</li>
              <li>Refresh Rate: {{display.currentRefreshRate}}</li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="motherboard">
          <h2>
            <font-awesome-icon icon="server" />&nbsp;Motherboard
          </h2>
          <h3>{{`${hardware.baseboard.manufacturer} Model ${hardware.baseboard.model}`}}</h3>
          <ul>
            <li>Version: {{hardware.baseboard.version}}</li>
            <li>
              BIOS:
              <ul>
                <li>{{`${hardware.bios.vendor} ${hardware.bios.version} Rev. ${hardware.bios.revision}`}}</li>
                <li>Release Date: {{hardware.bios.releaseDate}}</li>
              </ul>
            </li>
          </ul>
        </div>
        <hr />
        <div class="disk">
          <h2>
            <font-awesome-icon icon="database" />&nbsp;Disks
          </h2>
          <div v-for="disk in hardware.diskLayout" :key="disk.name">
            <h3>
              <font-awesome-icon icon="hdd" v-if="disk.type === 'HD'" />
              <font-awesome-icon icon="hdd" v-if="disk.type === 'SSD'" />
              <font-awesome-icon icon="sd-card" v-if="disk.interfaceType === 'USB'" />
              {{disk.name}}
            </h3>
            <ul>
              <li>Size: {{Math.floor(disk.size / (1024 * 1024))}} MB</li>
              <li>Type: {{disk.type}}</li>
              <li>Interface: {{disk.interfaceType}}</li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="system">
          <h2>
            <font-awesome-icon icon="keyboard" />&nbsp;System
          </h2>
          <h3>{{hardware.os.hostname}}</h3>
          <ul>
            <li>Architecture: {{hardware.os.arch}}</li>
            <li>Platform: {{hardware.os.platform}}</li>
            <li>Distro: {{hardware.os.distro}}</li>
            <li>Release: {{hardware.os.release}}</li>
            <li>Kernel: {{hardware.os.kernel}}</li>
            <li>Build: {{hardware.os.build}}</li>
          </ul>
        </div>
        <hr />
        <div class="network">
          <h2>
            <font-awesome-icon icon="network-wired" />&nbsp;Network
          </h2>
          <!-- interface is a reserved keyword -->
          <div v-for="adapter in hardware.net" :key="adapter.ifaceName">
            <h3>
              <font-awesome-icon icon="ethernet" v-if="adapter.type === 'wired'" />
              <font-awesome-icon icon="wifi" v-if="adapter.type === 'wireless'" />
              {{adapter.ifaceName}}
            </h3>
            <ul>
              <li>Type: {{adapter.type}}</li>
              <li>Interface: {{adapter.iface}}</li>
              <li>State: {{adapter.operstate}}</li>
              <li>Speed: {{adapter.speed}} Mbit/sec</li>
            </ul>
            <ul v-if="adapter.ip4 !== ''">
              <li>IPv4 Address: {{adapter.ip4 === "" ? "Not Connected" : adapter.ip4}}</li>
              <li>IPv4 Subnet: {{adapter.ip4subnet === "" ? "Not Connected" : adapter.ip4subnet}}</li>
              <li>IPv6 Address: {{adapter.ip6 === "" ? "Not Connected" : adapter.ip6}}</li>
              <li>IPv6 Subnet: {{adapter.ip6subnet === "" ? "Not Connected" : adapter.ip6subnet}}</li>
              <li>MAC Address: {{adapter.mac}}</li>
            </ul>
            <p v-else>Not Connected</p>
          </div>
        </div>
      </div>
    </template>
    <button @click="updateInfo">Refresh</button>
  </div>
</template>

<script>
export default {
  name: "Static",
  components: {},
  data() {
    return {
      error: null
    };
  },
  computed: {
    hardware() {
      return this.$store.state.staticHardware;
    }
  },
  methods: {
    getHardwareInfo() {
      this.$axios({
        method: "GET",
        url: "/hardware/static",
        headers: {}
      })
        .then(res => {
          console.log(res);
          this.$store.dispatch("setHardware", { data: res.data });
        })
        .catch(err => {
          console.error(
            `Error ${err.response.status}. Could not retrieve system details.`
          );
          this.error = err.response.data;
        });
    },
    updateInfo() {
      this.getHardwareInfo();
      this.$store.dispatch("resetHardware");
    }
  },
  mounted() {
    if (this.hardware) {
      console.log("Using cached version");
    } else {
      this.getHardwareInfo();
    }
  }
};
</script>

<style>
</style>