const App = {
  state: {
    currentView: 'home',
    currentProvince: null,
    currentDistrict: null,
    currentBuildingName: null,
    currentTag: null,
    currentTrailId: null,
    currentTrailType: null,
    theme: localStorage.getItem('theme') || 'light'
  },

  _cache: {
    buildingCards: new Map(),
    searchCards: new Map(),
    tagStyles: new Map(),
    protectionBadges: new Map(),
    truncatedTexts: new Map(),
    buildingByName: new Map(),
    provinceData: new Map(),
    jsonData: new Map()
  },

  _cacheLimits: {
    buildingCards: 200,
    searchCards: 100,
    tagStyles: 100,
    protectionBadges: 50,
    truncatedTexts: 500,
    provinceData: 50,
    buildingByName: 200,
    jsonData: 50
  },

  provinceStyles: {
    'beijing': { icon: '⛩️', color: '#e74c3c', bgColor: '#fdf2f2' },
    'tianjin': { icon: '⚓', color: '#3498db', bgColor: '#ebf5fb' },
    'hebei': { icon: '🏔️', color: '#2ecc71', bgColor: '#eafaf1' },
    'shanxi': { icon: '🏛️', color: '#9b59b6', bgColor: '#f5eef8' },
    'neimenggu': { icon: '🌿', color: '#1abc9c', bgColor: '#e8f8f5' },
    'liaoning': { icon: '⚙️', color: '#34495e', bgColor: '#f2f4f6' },
    'jilin': { icon: '🌲', color: '#16a085', bgColor: '#e8f6f3' },
    'heilongjiang': { icon: '❄️', color: '#2980b9', bgColor: '#eaf2f8' },
    'shanghai': { icon: '🌆', color: '#e67e22', bgColor: '#fef5e7' },
    'jiangsu': { icon: '🌊', color: '#3498db', bgColor: '#ebf5fb' },
    'zhejiang': { icon: '🏞️', color: '#27ae60', bgColor: '#eafaf1' },
    'anhui': { icon: '📜', color: '#8e44ad', bgColor: '#f5eef8' },
    'fujian': { icon: '🏝️', color: '#d35400', bgColor: '#fdf2e9' },
    'jiangxi': { icon: '🌸', color: '#c0392b', bgColor: '#fdedec' },
    'shandong': { icon: '🌅', color: '#2980b9', bgColor: '#eaf2f8' },
    'henan': { icon: '🏺', color: '#f39c12', bgColor: '#fef9e7' },
    'hubei': { icon: '🌉', color: '#e74c3c', bgColor: '#fdf2f2' },
    'hunan': { icon: '🌶️', color: '#16a085', bgColor: '#e8f6f3' },
    'guangdong': { icon: '🌺', color: '#e67e22', bgColor: '#fef5e7' },
    'guangxi': { icon: '🌴', color: '#27ae60', bgColor: '#eafaf1' },
    'hainan': { icon: '🥥', color: '#2ecc71', bgColor: '#eafaf1' },
    'chongqing': { icon: '🍲', color: '#9b59b6', bgColor: '#f5eef8' },
    'sichuan': { icon: '🐼', color: '#34495e', bgColor: '#f2f4f6' },
    'guizhou': { icon: '🌁', color: '#1abc9c', bgColor: '#e8f8f5' },
    'yunnan': { icon: '🦚', color: '#e74c3c', bgColor: '#fdf2f2' },
    'xizang': { icon: '🏔️', color: '#3498db', bgColor: '#ebf5fb' },
    'shaanxi': { icon: '🐴', color: '#8e44ad', bgColor: '#f5eef8' },
    'gansu': { icon: '🏜️', color: '#f39c12', bgColor: '#fef9e7' },
    'qinghai': { icon: '💧', color: '#2980b9', bgColor: '#eaf2f8' },
    'ningxia': { icon: '🌾', color: '#27ae60', bgColor: '#eafaf1' },
    'xinjiang': { icon: '🍇', color: '#9b59b6', bgColor: '#f5eef8' },
    'taiwan': { icon: '🏝️', color: '#e67e22', bgColor: '#fef5e7' },
    'hongkong': { icon: '🌃', color: '#34495e', bgColor: '#f2f4f6' },
    'macau': { icon: '🎰', color: '#c0392b', bgColor: '#fdedec' },
    'cross': { icon: '🗺️', color: '#16a085', bgColor: '#e8f6f3' }
  },

  colorPalette: [
    { color: '#B22222', bg: '#FDF2F2' },
    { color: '#8B4513', bg: '#FDF8F3' },
    { color: '#2F4F4F', bg: '#F0F5F5' },
    { color: '#1E3A5F', bg: '#F0F4F8' },
    { color: '#DAA520', bg: '#FDF9F0' },
    { color: '#708090', bg: '#F5F5F7' }
  ],

  tagStyles: {
    '古建筑': { icon: '🏛️' }, '古遗址': { icon: '🏺' }, '古城遗址': { icon: '🏚️' },
    '古墓葬': { icon: '⚰️' }, '陵墓': { icon: '🪦' }, '名人墓': { icon: '👤' }, '壁画墓': { icon: '🎨' },
    '石窟寺': { icon: '🪨' }, '石刻': { icon: '🗿' }, '造像': { icon: '🙏' }, '碑刻': { icon: '📜' },
    '经幢': { icon: '🗼' }, '彩塑': { icon: '🤲' }, '雕塑': { icon: '🗽' }, '壁画': { icon: '🖼️' },
    '岩画': { icon: '🪨' }, '佛教艺术': { icon: '☸️' },
    '佛教寺院': { icon: '🛕' }, '塔': { icon: '🗼' }, '藏传佛教': { icon: '🪷' },
    '道教建筑': { icon: '☯️' }, '教堂': { icon: '⛪' }, '清真寺': { icon: '🕌' },
    '祭坛': { icon: '🕯️' }, '关帝庙': { icon: '⚔️' }, '城隍庙': { icon: '🏛️' },
    '妈祖庙': { icon: '🌊' }, '文昌阁': { icon: '⭐' },
    '革命遗址': { icon: '🚩' }, '红色旅游': { icon: '⭐' },
    '近现代史迹': { icon: '🏛️' }, '中西合璧': { icon: '🤝' }, '纪念建筑': { icon: '🗽' },
    '博物馆': { icon: '🏛️' }, '名人故居': { icon: '🏠' },
    '军事遗址': { icon: '⚔️' }, '关隘': { icon: '🏔️' }, '长城': { icon: '🐉' },
    '城墙': { icon: '🧱' }, '烽燧': { icon: '🔥' }, '炮台': { icon: '💣' },
    '工业遗产': { icon: '🏭' }, '桥梁': { icon: '🌉' }, '水利工程': { icon: '💧' },
    '运河': { icon: '🌊' }, '码头': { icon: '⚓' }, '天文': { icon: '🔭' },
    '驿站': { icon: '📮' }, '栈道': { icon: '🪜' },
    '宫殿': { icon: '👑' }, '园林': { icon: '🌿' }, '衙署': { icon: '⚖️' },
    '民居': { icon: '🏘️' }, '会馆': { icon: '🏤' }, '书院': { icon: '📚' },
    '祠堂': { icon: '👪' }, '文庙': { icon: '🎓' }, '牌坊': { icon: '⛩️' },
    '四合院': { icon: '🏚️' }, '古村落': { icon: '🏡' }, '历史文化街区': { icon: '🏙️' },
    '戏台': { icon: '🎭' }, '影壁': { icon: '🧱' }, '钟鼓楼': { icon: '🥁' },
    '窑址': { icon: '🔥' }, '农业遗产': { icon: '🌾' }, '活态遗产': { icon: '🔄' },
    '文化景观': { icon: '🌄' }, '世界遗产': { icon: '🌟' }, '自然遗产': { icon: '🌲' },
    '丝绸之路': { icon: '🐪' }, '澳门历史城区': { icon: '🏛️' },
    '徽派建筑': { icon: '🏘️' }, '晋商建筑': { icon: '💰' }, '岭南建筑': { icon: '🏠' },
    '闽南建筑': { icon: '🏡' }, '客家建筑': { icon: '🏘️' }, '土楼': { icon: '🟤' },
    '窑洞': { icon: '🕳️' }, '碉楼': { icon: '🗼' }, '蒙古包': { icon: '⛺' },
    '傣族建筑': { icon: '🏠' }, '侗族建筑': { icon: '🏘️' }, '苗族建筑': { icon: '🏠' },
    '藏式建筑': { icon: '🏔️' }, '古井': { icon: '🕳️' }, '古树名木': { icon: '🌳' },
    '龙山文化': { icon: '🏺' }, '仰韶文化': { icon: '🏺' }, '大汶口文化': { icon: '🏺' },
    '良渚文化': { icon: '🏺' }, '红山文化': { icon: '🏺' }, '马家窑文化': { icon: '🏺' },
    '齐家文化': { icon: '🏺' }, '河姆渡文化': { icon: '🏺' },
    '彝族建筑': { icon: '🏠' }, '土家族建筑': { icon: '🏠' },
    '维吾尔族建筑': { icon: '🏠' }, '回族建筑': { icon: '🏠' },
    '白族建筑': { icon: '🏠' }, '纳西族建筑': { icon: '🏠' },
    '龙王庙': { icon: '🐉' }, '岳王庙': { icon: '⚔️' }, '禹王庙': { icon: '💧' },
    '东岳庙': { icon: '⛰️' }, '真武庙': { icon: '⭐' },
    '古建筑群': { icon: '🏘️' }, '古塔': { icon: '🗼' }, '古寺': { icon: '🛕' },
    '古桥': { icon: '🌉' }, '古墓': { icon: '⚰️' }, '古街': { icon: '🏙️' },
    '古战场': { icon: '⚔️' }, '古城': { icon: '🏚️' }, '古庙': { icon: '🛕' },
    '古亭': { icon: '⛩️' }, '古楼': { icon: '🏯' }, '古宅': { icon: '🏚️' },
    '大自然': { icon: '🌿' }, '海洋': { icon: '🌊' }, '河流': { icon: '💧' },
    '岛屿': { icon: '🏝️' }, '山川': { icon: '⛰️' }, '森林': { icon: '🌲' },
    '湖泊': { icon: '🏞️' }, '岛屿海岸': { icon: '🏖️' },
  },

  buildingCategories: {
    ancient: {
      label: '古建筑',
      key: 'ancient',
      icon: '🏛️',
      color: '#8B0000',
      bgColor: '#FFF0F0',
      markerColor: '#C0392B',
      size: 20,
      matchTypes: ['古建筑']
    },
    ruins: {
      label: '古遗址',
      key: 'ruins',
      icon: '🏺',
      color: '#CD853F',
      bgColor: '#FFF8F0',
      markerColor: '#D2691E',
      size: 20,
      matchTypes: ['古遗址']
    },
    tomb: {
      label: '古墓葬',
      key: 'tomb',
      icon: '⚰️',
      color: '#708090',
      bgColor: '#F5F5F5',
      markerColor: '#5F6B7A',
      size: 20,
      matchTypes: ['古墓葬']
    },
    grotto: {
      label: '石窟寺及石刻',
      key: 'grotto',
      icon: '🧘',
      color: '#9370DB',
      bgColor: '#F5F0FF',
      markerColor: '#7B68EE',
      size: 20,
      matchTypes: ['石窟寺及石刻']
    },
    modern: {
      label: '近现代重要史迹及代表性建筑',
      key: 'modern',
      icon: '🏛️',
      color: '#4169E1',
      bgColor: '#F0F5FF',
      markerColor: '#2E5CB8',
      size: 20,
      matchTypes: ['近现代重要史迹及代表性建筑']
    },
    other: {
      label: '其他',
      key: 'other',
      icon: '📍',
      color: '#3498DB',
      bgColor: '#F0F8FF',
      markerColor: '#2980B9',
      size: 20,
      matchTypes: ['其他', '']
    }
  },

  eras: [
    { id: 'paleolithic', name: '旧石器', keywords: ['旧石器'], yearMin: -Infinity, yearMax: -10000 },
    { id: 'neolithic', name: '新石器', keywords: ['新石器', '龙山文化'], yearMin: -10000, yearMax: -2000 },
    { id: 'xia', name: '夏', keywords: ['夏代', '夏朝', '夏', '上古'], yearMin: -2070, yearMax: -1600 },
    { id: 'shang', name: '商', keywords: ['商代', '商朝', '商', '青铜时代', '殷'], yearMin: -1600, yearMax: -1046 },
    { id: 'western_zhou', name: '西周', keywords: ['西周'], yearMin: -1046, yearMax: -771 },
    { id: 'eastern_zhou', name: '东周', keywords: ['东周'], yearMin: -770, yearMax: -256, timeline: false },
    { id: 'spring_autumn', name: '春秋', keywords: ['春秋'], yearMin: -770, yearMax: -476 },
    { id: 'warring_states', name: '战国', keywords: ['战国'], yearMin: -475, yearMax: -221 },
    { id: 'zhou', name: '周', keywords: ['周代', '周朝', '周'], yearMin: -1046, yearMax: -256, timeline: false },
    { id: 'qin', name: '秦', keywords: ['秦代', '秦朝', '秦汉', '秦'], yearMin: -221, yearMax: -207 },
    { id: 'western_han', name: '西汉', keywords: ['西汉'], yearMin: -202, yearMax: 9 },
    { id: 'eastern_han', name: '东汉', keywords: ['东汉'], yearMin: 25, yearMax: 220 },
    { id: 'han', name: '汉', keywords: ['汉代', '汉朝', '汉'], yearMin: -202, yearMax: 220, timeline: false },
    { id: 'three_kingdoms', name: '三国', keywords: ['三国', '曹魏'], yearMin: 220, yearMax: 280 },
    { id: 'western_jin', name: '西晋', keywords: ['西晋'], yearMin: 265, yearMax: 316 },
    { id: 'eastern_jin', name: '东晋', keywords: ['东晋'], yearMin: 317, yearMax: 420 },
    { id: 'jin', name: '晋', keywords: ['晋代', '晋朝', '晋'], yearMin: 265, yearMax: 420, timeline: false },
    { id: 'sixteen_kingdoms', name: '十六国', keywords: ['十六国', '后赵'], yearMin: 304, yearMax: 439 },
    { id: 'northern_southern', name: '南北朝', keywords: ['南北朝', '北魏', '东魏', '西魏', '北齐', '北周', '北燕', '北朝', '南朝'], yearMin: 420, yearMax: 589 },
    { id: 'sui', name: '隋', keywords: ['隋代', '隋朝', '隋'], yearMin: 581, yearMax: 618 },
    { id: 'tang', name: '唐', keywords: ['唐代', '唐朝', '唐', '高句丽'], yearMin: 618, yearMax: 907 },
    { id: 'five_dynasties', name: '五代', keywords: ['五代', '南唐', '后周'], yearMin: 907, yearMax: 960 },
    { id: 'northern_song', name: '北宋', keywords: ['北宋'], yearMin: 960, yearMax: 1127 },
    { id: 'southern_song', name: '南宋', keywords: ['南宋'], yearMin: 1127, yearMax: 1279 },
    { id: 'song', name: '宋', keywords: ['宋代', '宋朝', '宋'], yearMin: 960, yearMax: 1279, timeline: false },
    { id: 'western_xia', name: '西夏', keywords: ['西夏'], yearMin: 1038, yearMax: 1227, timeline: false },
    { id: 'liao', name: '辽', keywords: ['辽代', '辽朝', '辽'], yearMin: 907, yearMax: 1125 },
    { id: 'jin_dynasty', name: '金', keywords: ['金代', '金朝', '金'], yearMin: 1115, yearMax: 1234 },
    { id: 'yuan', name: '元', keywords: ['元代', '元朝', '元'], yearMin: 1271, yearMax: 1368 },
    { id: 'ming', name: '明', keywords: ['明代', '明朝', '明'], yearMin: 1368, yearMax: 1644 },
    { id: 'qing', name: '清', keywords: ['清代', '清朝', '清'], yearMin: 1644, yearMax: 1912 },
    { id: 'republic', name: '民国', keywords: ['民国', '近代'], yearMin: 1912, yearMax: 1949 },
    { id: 'prc', name: '中华人民共和国', keywords: ['中华人民共和国'], yearMin: 1949, yearMax: 2030 }
  ],

  _eraColors: {
    paleolithic: '#5D4037',
    neolithic: '#8D6E63',
    xia: '#F9A825',
    shang: '#F57F17',
    western_zhou: '#2E7D32',
    eastern_zhou: '#388E3C',
    spring_autumn: '#43A047',
    warring_states: '#66BB6A',
    zhou: '#1B5E20',
    qin: '#7B1FA2',
    western_han: '#C62828',
    eastern_han: '#E53935',
    han: '#B71C1C',
    three_kingdoms: '#FF6D00',
    western_jin: '#1565C0',
    eastern_jin: '#1E88E5',
    jin: '#0D47A1',
    sixteen_kingdoms: '#00838F',
    northern_southern: '#00695C',
    sui: '#6A1B9A',
    tang: '#E65100',
    five_dynasties: '#FDD835',
    northern_song: '#AD1457',
    southern_song: '#880E4F',
    song: '#C2185B',
    western_xia: '#FF8F00',
    liao: '#4527A0',
    jin_dynasty: '#283593',
    yuan: '#37474F',
    ming: '#D84315',
    qing: '#1A237E',
    republic: '#616161',
    prc: '#C62828'
  },

  _loadedProvinceData: new Set(),
  _provinceMeta: null,
  _trailRegistry: null,
  _allBuildingsCache: null,
  _allTagsCache: null,
  _tagBuildingsCache: {},
  _pendingLoads: {},
  _map: null,
  _markerCluster: null,
  _activeEraFilter: 'all',
  _activeCategoryFilter: 'all',
  _mapMarkers: [],

  async init() {
    this.setupTheme();
    this.setupEventListeners();
    await this._loadMeta();
    this.setupNavigation();
    this.render();
  },

  async _loadMeta() {
    try {
      const [provincesRes, trailRes] = await Promise.all([
        fetch('data/provinces.json'),
        fetch('trail/registry.json')
      ]);
      this._provinceMeta = await provincesRes.json();
      this._trailRegistry = await trailRes.json();
    } catch (e) {
      console.error('Failed to load meta data:', e);
      this._provinceMeta = { provinces: [], protectionLabels: {} };
      this._trailRegistry = [];
    }
  },

  async _fetchJSON(url) {
    if (this._cache.jsonData.has(url)) return this._cache.jsonData.get(url);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (this._cache.jsonData.size >= this._cacheLimits.jsonData) {
        this._cache.jsonData.delete(this._cache.jsonData.keys().next().value);
      }
      this._cache.jsonData.set(url, data);
      return data;
    } catch (e) {
      console.error('Failed to fetch:', url, e);
      return null;
    }
  },

  async loadProvinceData(provinceId) {
    if (this._loadedProvinceData.has(provinceId)) return this._cache.provinceData.get(provinceId);
    if (this._pendingLoads[provinceId]) return this._pendingLoads[provinceId];
    const fileName = provinceId === 'cross' ? 'cross-province.json' : `${provinceId}.json`;
    const promise = this._fetchJSON(`data/${fileName}`).then(data => {
      delete this._pendingLoads[provinceId];
      if (data) {
        this._loadedProvinceData.add(provinceId);
        this._cache.provinceData.set(provinceId, data);
        if (this._cache.provinceData.size > this._cacheLimits.provinceData) {
          this._cache.provinceData.delete(this._cache.provinceData.keys().next().value);
        }
        this._allBuildingsCache = null;
        this._allTagsCache = null;
        this._tagBuildingsCache = {};
      }
      return data;
    });
    this._pendingLoads[provinceId] = promise;
    return promise;
  },

  async loadProvinces(provinceIds) {
    await Promise.all(provinceIds.map(id => this.loadProvinceData(id)));
  },

  async _ensureDataLoaded() {
    if (this._loadedProvinceData.size === 0) {
      const allIds = this._provinceMeta?.provinces?.map(p => p.id) || [];
      await this.loadProvinces(allIds);
    }
  },

  _initMap(container) {
    if (this._map) { this._map.invalidateSize(); return; }
    this._map = L.map(container, {
      center: [35.5, 105.0],
      zoom: 5,
      zoomControl: true,
      attributionControl: false
    });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      minZoom: 3
    }).addTo(this._map);
    this._markerCluster = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        let size = 'small';
        if (count >= 100) size = 'large';
        else if (count >= 20) size = 'medium';
        return L.divIcon({
          html: `<div class="map-cluster map-cluster-${size}"><span>${count}</span></div>`,
          className: 'map-cluster-container',
          iconSize: L.point(40, 40)
        });
      }
    });
    this._map.addLayer(this._markerCluster);
  },

  _destroyMap() {
    if (this._map) {
      this._map.remove();
      this._map = null;
      this._markerCluster = null;
    }
  },

  _passesMapFilters(categoryKey, eraId) {
    const catOk = this._activeCategoryFilter === 'all' || categoryKey === this._activeCategoryFilter;
    const eraOk = this._activeEraFilter === 'all' || (eraId && eraId === this._activeEraFilter);
    return catOk && eraOk;
  },

  _filterMapMarkers() {
    if (!this._markerCluster || !this._mapMarkers) return;
    this._markerCluster.clearLayers();
    let visibleCount = 0;
    for (const { marker, categoryKey, eraId } of this._mapMarkers) {
      if (this._passesMapFilters(categoryKey, eraId)) {
        this._markerCluster.addLayer(marker);
        visibleCount++;
      }
    }
    const statTotal = document.getElementById('mapStatTotal');
    if (statTotal) statTotal.textContent = visibleCount;
  },

  _setCategoryFilter(categoryKey) {
    this._activeCategoryFilter = categoryKey;
    this._filterMapMarkers();
    const legendEl = document.getElementById('mapLegend');
    if (legendEl) {
      legendEl.querySelectorAll('.map-legend-item').forEach(el => el.classList.remove('active'));
      const activeEl = legendEl.querySelector(`[data-cat="${categoryKey}"]`);
      if (activeEl) activeEl.classList.add('active');
    }
    this._updateMapStats();
  },

  _setEraFilter(eraId) {
    this._activeEraFilter = eraId;
    this._filterMapMarkers();
    const timelineEl = document.getElementById('mapTimeline');
    if (timelineEl) {
      timelineEl.querySelectorAll('.era-timeline-block, .era-timeline-all').forEach(el => el.classList.remove('active'));
      if (eraId === 'all') {
        const allBtn = timelineEl.querySelector('.era-timeline-all');
        if (allBtn) allBtn.classList.add('active');
      } else {
        const activeEl = timelineEl.querySelector(`[data-era="${eraId}"]`);
        if (activeEl) activeEl.classList.add('active');
      }
    }
    this._updateMapStats();
  },

  _updateMapStats() {
    const totalEl = document.getElementById('mapStatTotal');
    const labelEl = document.getElementById('mapStatLabel');
    const provEl = document.getElementById('mapStatProvinces');
    if (!totalEl) return;
    let visible = 0;
    const loadedProvIds = new Set();
    for (const { marker, categoryKey, eraId } of this._mapMarkers) {
      if (this._passesMapFilters(categoryKey, eraId)) {
        visible++;
        if (marker._provinceId) loadedProvIds.add(marker._provinceId);
      }
    }
    totalEl.textContent = visible;
    if (provEl) provEl.textContent = loadedProvIds.size || this._provinceMeta?.provinces?.length || 0;
    if (labelEl) {
      const activeEra = this._activeEraFilter && this._activeEraFilter !== 'all' ? this.eras.find(e => e.id === this._activeEraFilter) : null;
      const activeCat = this._activeCategoryFilter && this._activeCategoryFilter !== 'all' ? this.buildingCategories[this._activeCategoryFilter] : null;
      const parts = [];
      if (activeEra) parts.push(activeEra.name);
      else parts.push('全部年代');
      if (activeCat) parts.push(activeCat.label);
      else parts.push('全部分类');
      labelEl.textContent = parts.join(' · ');
    }
  },

  _createMapMarker(building) {
    const category = this.getBuildingCategory(building);
    const size = category.size || 20;
    const isWorld = category.isWorldHeritage;
    const worldClass = isWorld ? ' map-marker-world' : '';
    const icon = L.divIcon({
      html: `<div class="map-marker${worldClass}" style="background:${category.markerColor}; width:${size}px; height:${size}px;" title="${building.name}"><span>${category.icon}</span></div>`,
      className: 'map-marker-container',
      iconSize: [size + 4, size + 4],
      iconAnchor: [(size + 4) / 2, (size + 4) / 2]
    });
    const marker = L.marker([building.lat, building.lng], { icon });
    const protectionBadge = this.generateProtectionBadge(building);
    const popupContent = `
      <div class="map-popup">
        <div class="map-popup-header" style="border-left:3px solid ${category.markerColor}; padding-left:8px;">
          <strong>${category.icon} ${building.name}</strong>
        </div>
        <div class="map-popup-body">
          <div class="map-popup-info">
            <span class="map-popup-era">📅 ${building.era}</span>
            <span class="map-popup-district">📍 ${building.districtName}</span>
          </div>
          ${protectionBadge ? `<div class="map-popup-badge">${protectionBadge}</div>` : ''}
          <p class="map-popup-desc">${this.truncateText(building.description, 80)}</p>
          <a href="${this.generateBuildingHash(building)}" class="map-popup-link" data-nav>查看详情 →</a>
        </div>
      </div>`;
    marker.bindPopup(popupContent, { maxWidth: 280, className: 'map-popup-container' });
    marker._categoryKey = category.key;
    marker._provinceId = building.provinceId;
    return marker;
  },

  getAllBuildings() {
    if (this._allBuildingsCache) return this._allBuildingsCache;
    const all = [];
    for (const [provinceId, data] of this._cache.provinceData) {
      const provinceName = this.getProvinceName(provinceId);
      if (data.buildings) {
        for (const b of data.buildings) {
          all.push({ ...b, province: provinceName, provinceId });
        }
      }
    }
    this._allBuildingsCache = all;
    return all;
  },

  getProvinceName(provinceId) {
    if (provinceId === 'cross') return '跨省';
    const p = this._provinceMeta?.provinces?.find(p => p.id === provinceId);
    return p ? p.name : provinceId;
  },

  getProvinceById(provinceId) {
    return this._provinceMeta?.provinces?.find(p => p.id === provinceId);
  },

  getProtectionLabel(provinceId) {
    return this._provinceMeta?.protectionLabels?.[provinceId] || '全国重点文物保护单位';
  },

  getProvinceStyle(provinceId) {
    return this.provinceStyles[provinceId] || { icon: '📍', color: '#3498db', bgColor: '#ebf5fb' };
  },

  getBuildingCategory(building) {
    const type = building.type || '';
    const categories = this.buildingCategories;
    for (const [key, cat] of Object.entries(categories)) {
      if (cat.matchTypes.includes(type)) {
        const isWorldHeritage = (building.tags || []).includes('世界遗产');
        const result = { ...cat, key };
        if (isWorldHeritage) {
          result.size = 26;
          result.isWorldHeritage = true;
        }
        return result;
      }
    }
    return { ...categories.other, key: 'other' };
  },

  getTagStyle(tagName, index) {
    const cacheKey = `${tagName}_${index % this.colorPalette.length}`;
    if (this._cache.tagStyles.has(cacheKey)) return this._cache.tagStyles.get(cacheKey);
    const style = this.tagStyles[tagName] || { icon: '🏷️' };
    const palette = this.colorPalette[index % this.colorPalette.length];
    const result = { ...style, color: palette.color, bg: palette.bg };
    if (this._cache.tagStyles.size >= this._cacheLimits.tagStyles) {
      this._cache.tagStyles.delete(this._cache.tagStyles.keys().next().value);
    }
    this._cache.tagStyles.set(cacheKey, result);
    return result;
  },

  getDistrictData(provinceId, districtId) {
    const data = this._cache.provinceData.get(provinceId);
    if (data?.districts?.[districtId]) {
      return { id: districtId, ...data.districts[districtId] };
    }
    return null;
  },

  getBuildingsByDistrict(provinceId, districtId) {
    const data = this._cache.provinceData.get(provinceId);
    if (!data?.buildings) return [];
    const provinceName = this.getProvinceName(provinceId);
    return data.buildings
      .filter(b => b.district === districtId)
      .map(b => ({ ...b, province: provinceName, provinceId }));
  },

  getAllDistricts(provinceId) {
    const data = this._cache.provinceData.get(provinceId);
    if (!data?.districts) return [];
    return Object.entries(data.districts).map(([id, d]) => ({ id, ...d }));
  },

  findBuildingByFullPath(fullPath) {
    if (this._cache.buildingByName.has(fullPath)) return this._cache.buildingByName.get(fullPath);
    const allBuildings = this.getAllBuildings();
    let building = allBuildings.find(b => b.name === fullPath);
    if (!building) {
      building = allBuildings.find(b => {
        const p = `${b.province || ''}${b.districtName || ''}${b.name}`;
        return p === fullPath;
      });
    }
    if (building) {
      this._cache.buildingByName.set(fullPath, building);
      if (this._cache.buildingByName.size > this._cacheLimits.buildingByName) {
        this._cache.buildingByName.delete(this._cache.buildingByName.keys().next().value);
      }
    }
    return building;
  },

  generateBuildingHash(building) {
    const provinceName = building.province || this.getProvinceName(building.provinceId);
    const fullPath = `${provinceName}${building.districtName}${building.name}`;
    return `?page=building&name=${encodeURIComponent(fullPath)}`;
  },

  navigateTo(url) {
    window.history.pushState({}, '', url);
    this.parseParams();
    this.render();
  },

  generateProtectionBadge(building) {
    const cacheKey = `${building.worldHeritage}_${building.worldHeritageYear}_${building.protectionLevel}_${building.protectionBatch}`;
    if (this._cache.protectionBadges.has(cacheKey)) return this._cache.protectionBadges.get(cacheKey);
    let result = '';
    if (building.worldHeritage) {
      result = `<span class="protection-badge heritage">🌍 世界遗产${building.worldHeritageYear ? '·' + building.worldHeritageYear : ''}</span>`;
    } else if (building.protectionLevel && building.protectionLevel.includes('全国重点文物保护单位')) {
      result = `<span class="protection-badge national">${building.protectionBatch || '全国重点'}</span>`;
    }
    if (this._cache.protectionBadges.size >= this._cacheLimits.protectionBadges) {
      this._cache.protectionBadges.delete(this._cache.protectionBadges.keys().next().value);
    }
    this._cache.protectionBadges.set(cacheKey, result);
    return result;
  },

  truncateText(text, maxLength, suffix = '...') {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    const cacheKey = `${text}_${maxLength}_${suffix}`;
    if (this._cache.truncatedTexts.has(cacheKey)) return this._cache.truncatedTexts.get(cacheKey);
    const result = text.substring(0, maxLength) + suffix;
    if (this._cache.truncatedTexts.size >= this._cacheLimits.truncatedTexts) {
      this._cache.truncatedTexts.delete(this._cache.truncatedTexts.keys().next().value);
    }
    this._cache.truncatedTexts.set(cacheKey, result);
    return result;
  },

  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  _resolveBuildingRef(buildingRef) {
    if (!buildingRef) return null;
    if (buildingRef.embedded) return buildingRef.embedded;
    const allBuildings = this.getAllBuildings();
    const byName = allBuildings.find(b => b.name === buildingRef.name);
    if (!byName) return null;
    if (buildingRef.province && byName.provinceId !== buildingRef.province) {
      const byProvince = allBuildings.find(b => b.name === buildingRef.name && b.provinceId === buildingRef.province);
      return byProvince || byName;
    }
    return byName;
  },

  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  },

  toggleTheme() {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    localStorage.setItem('theme', this.state.theme);
  },

  setupEventListeners() {
    document.querySelector('.theme-toggle')?.addEventListener('click', () => this.toggleTheme());
    document.querySelector('.nav-toggle')?.addEventListener('click', () => {
      document.querySelector('.nav-menu')?.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      const card = e.target.closest('.building-card');
      if (card) {
        const url = card.getAttribute('data-href');
        if (url) {
          e.preventDefault();
          e.stopPropagation();
          this.navigateTo(url);
        }
      }
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-nav]');
      if (link) {
        e.preventDefault();
        this.navigateTo(link.getAttribute('href') || link.getAttribute('data-nav'));
      }
    });

    window.addEventListener('popstate', () => {
      this.parseParams();
      this.render().catch(() => {});
    });
  },

  setupNavigation() {
    this.parseParams();
  },

  parseParams() {
    const params = new URLSearchParams(window.location.search);
    this.state.currentView = params.get('page') || 'home';
    this.state.currentProvince = params.get('id') || params.get('pid') || null;
    this.state.currentDistrict = params.get('did') || null;
    this.state.currentBuildingName = params.get('name') || null;
    this.state.currentTag = params.get('name') && this.state.currentView === 'tag' ? params.get('name') : null;
    this.state.currentTrailId = params.get('id') && (this.state.currentView === 'trail-detail') ? params.get('id') : null;
    this.state.currentTrailType = params.get('type') || null;
    document.querySelector('.nav-menu')?.classList.remove('active');
  },

  async render() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
      breadcrumb.style.display = this.state.currentView === 'map' ? 'none' : '';
    }
    this.updateBreadcrumb();
    this.updateActiveNav();
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;
    window.scrollTo(0, 0);
    this._injectStructuredData();

    const view = this.state.currentView;
    if (view !== 'home' && view !== 'map') this._destroyMap();
    switch (view) {
      case 'home': await this.renderHome(mainContent); break;
      case 'map': await this.renderMap(mainContent); break;
      case 'provinces': this.renderProvinces(mainContent); break;
      case 'province': await this.renderProvince(mainContent); break;
      case 'district': await this.renderDistrict(mainContent); break;
      case 'building': await this.renderBuilding(mainContent); break;
      case 'tags': this.renderTags(mainContent); break;
      case 'tag': this.renderTagResults(mainContent); break;
      case 'search': this.renderSearchPage(mainContent); break;
      case 'cross': await this.renderCrossProvince(mainContent); break;
      case 'trail': this.renderTrailList(mainContent); break;
      case 'trail-detail': await this.renderTrailDetail(mainContent); break;
      default: await this.renderHome(mainContent);
    }
  },

  _injectStructuredData() {
    let script = document.getElementById('ld-json');
    if (!script) {
      script = document.createElement('script');
      script.id = 'ld-json';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const breadcrumbs = [];
    const items = document.querySelectorAll('#breadcrumbList li');
    items.forEach((li, i) => {
      const a = li.querySelector('a');
      const name = li.textContent.trim();
      if (a) {
        breadcrumbs.push({ '@type': 'ListItem', position: i + 1, name, item: new URL(a.href, location.origin).href });
      } else {
        breadcrumbs.push({ '@type': 'ListItem', position: i + 1, name });
      }
    });
    const ld = { '@context': 'https://schema.org', '@graph': [] };
    if (breadcrumbs.length > 1) {
      ld['@graph'].push({ '@type': 'BreadcrumbList', itemListElement: breadcrumbs });
    }
    const view = this.state.currentView;
    if (view === 'building' && this.state.currentBuildingName) {
      const building = this.findBuildingByFullPath(this.state.currentBuildingName);
      if (building) {
        ld['@graph'].push({
          '@type': 'LandmarksOrHistoricalBuildings',
          name: building.name,
          description: (building.description || '').substring(0, 200),
          location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: building.districtName, addressRegion: building.province } }
        });
      }
    } else if (view === 'province' && this.state.currentProvince) {
      const p = this.getProvinceById(this.state.currentProvince);
      if (p) {
        ld['@graph'].push({ '@type': 'AdministrativeArea', name: p.name, description: `${p.name}的全国重点文物保护单位` });
      }
    }
    script.textContent = JSON.stringify(ld);
  },

  updateBreadcrumb() {
    const breadcrumbList = document.getElementById('breadcrumbList');
    if (!breadcrumbList) return;
    let items = [{ name: '🏠 首页', href: '?page=home' }];
    const v = this.state.currentView;

    if (v === 'provinces') items.push({ name: '🗺️ 省份' });
    else if (v === 'province' && this.state.currentProvince) {
      items.push({ name: '🗺️ 省份', href: '?page=provinces' });
      const province = this.getProvinceById(this.state.currentProvince);
      if (province) items.push({ name: `${this.getProvinceStyle(this.state.currentProvince).icon} ${province.name}` });
    } else if (v === 'district') {
      items.push({ name: '🗺️ 省份', href: '?page=provinces' });
      const province = this.getProvinceById(this.state.currentProvince);
      if (province) {
        items.push({ name: `${this.getProvinceStyle(this.state.currentProvince).icon} ${province.name}`, href: `?page=province&id=${province.id}` });
        const district = this.getDistrictData(this.state.currentProvince, this.state.currentDistrict);
        if (district) items.push({ name: `📍 ${district.name}` });
      }
    } else if (v === 'building' && this.state.currentBuildingName) {
      const building = this.findBuildingByFullPath(this.state.currentBuildingName);
      items.push({ name: '🗺️ 省份', href: '?page=provinces' });
      if (building) {
        const pStyle = this.getProvinceStyle(building.provinceId);
        if (building.provinceId === 'cross') {
          items.push({ name: `${pStyle.icon} ${building.province}`, href: '?page=cross' });
          items.push({ name: `📍 ${building.districtName}`, href: '?page=cross' });
        } else {
          items.push({ name: `${pStyle.icon} ${building.province}`, href: `?page=province&id=${building.provinceId}` });
          items.push({ name: `📍 ${building.districtName}`, href: `?page=district&pid=${building.provinceId}&did=${building.district}` });
        }
        items.push({ name: `🏛️ ${building.name}` });
      }
    } else if (v === 'tags') items.push({ name: '🏷️ 标签' });
    else if (v === 'tag') {
      items.push({ name: '🏷️ 标签', href: '?page=tags' });
      items.push({ name: `${this.getTagStyle(this.state.currentTag, 0).icon} ${this.state.currentTag}` });
    } else if (v === 'search') items.push({ name: '🔍 搜索' });
    else if (v === 'cross') items.push({ name: '🌊 跨省文物保护单位' });
    else if (v === 'trail') items.push({ name: '👣 足迹' });
    else if (v === 'map') items.push({ name: '🗺️ 地图' });
    else if (v === 'trail-detail' && this.state.currentTrailId) {
      items.push({ name: '👣 足迹', href: '?page=trail' });
      const trail = this._trailRegistry?.find(t => t.id === this.state.currentTrailId);
      if (trail) items.push({ name: `${trail.icon} ${trail.title}` });
    }

    breadcrumbList.innerHTML = items.map((item, index) => {
      if (index === items.length - 1 || !item.href) {
        return `<li class="active">${item.name}</li>`;
      }
      return `<li><a href="${item.href}" data-nav>${item.name}</a></li>`;
    }).join('');
  },

  updateActiveNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      const v = this.state.currentView;
      if ((v === 'trail' || v === 'trail-detail') && href === '?page=trail') link.classList.add('active');
      else if (href === `?page=${v}`) link.classList.add('active');
    });
  },

  searchBuildings(query) {
    const allBuildings = this.getAllBuildings();
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];
    return allBuildings.filter(b => {
      return (b.name && b.name.toLowerCase().includes(lowerQuery)) ||
        (b.location && b.location.toLowerCase().includes(lowerQuery)) ||
        (b.era && b.era.toLowerCase().includes(lowerQuery)) ||
        (b.type && b.type.toLowerCase().includes(lowerQuery)) ||
        (b.districtName && b.districtName.toLowerCase().includes(lowerQuery)) ||
        (b.tags && b.tags.some(tag => tag && tag.toLowerCase().includes(lowerQuery))) ||
        (b.description && b.description.toLowerCase().includes(lowerQuery)) ||
        (b.history && b.history.toLowerCase().includes(lowerQuery)) ||
        (b.architecture && b.architecture.toLowerCase().includes(lowerQuery)) ||
        (b.features && b.features.toLowerCase().includes(lowerQuery));
    }).map(b => {
      const reasons = [];
      if (b.name && b.name.toLowerCase().includes(lowerQuery)) reasons.push('名称匹配');
      if (b.location && b.location.toLowerCase().includes(lowerQuery)) reasons.push('地点匹配');
      if (b.era && b.era.toLowerCase().includes(lowerQuery)) reasons.push('年代匹配');
      if (b.tags && b.tags.some(tag => tag && tag.toLowerCase().includes(lowerQuery))) reasons.push('标签匹配');
      if (b.description && b.description.toLowerCase().includes(lowerQuery)) reasons.push('描述匹配');
      if (b.history && b.history.toLowerCase().includes(lowerQuery)) reasons.push('历史匹配');
      return { ...b, matchReasons: reasons };
    });
  },

  getBuildingsByTag(tag) {
    if (this._tagBuildingsCache[tag]) return this._tagBuildingsCache[tag];
    const result = this.getAllBuildings().filter(b => b.tags && b.tags.some(t => t === tag));
    this._tagBuildingsCache[tag] = result;
    return result;
  },

  getAllTags() {
    if (this._allTagsCache) return this._allTagsCache;
    const tagCount = {};
    this.getAllBuildings().forEach(b => {
      if (b.tags) b.tags.forEach(tag => { tagCount[tag] = (tagCount[tag] || 0) + 1; });
    });
    this._allTagsCache = Object.entries(tagCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    return this._allTagsCache;
  },

  createBuildingCard(building, shortDescLen = 60) {
    const cacheKey = `${building.provinceId}_${building.district}_${building.name}`;
    if (this._cache.buildingCards.has(cacheKey)) return this._cache.buildingCards.get(cacheKey);
    const href = this.generateBuildingHash(building);
    const provinceStyle = this.getProvinceStyle(building.provinceId);
    const protectionBadge = this.generateProtectionBadge(building);
    const shortDesc = this.truncateText(building.description, shortDescLen, '');
    const priorityTags = ['世界遗产', '古建筑', '近代建筑', '寺庙', '宫殿', '园林', '陵墓', '石窟', '塔', '桥梁', '革命遗址', '名人故居'];
    const tags = building.tags || [];
    const sortedTags = [...tags].sort((a, b) => {
      const ap = priorityTags.indexOf(a), bp = priorityTags.indexOf(b);
      if (ap !== -1 && bp === -1) return -1;
      if (ap === -1 && bp !== -1) return 1;
      return 0;
    });

    const cardHTML = `
      <div class="building-card" data-href="${href}" style="border-left-color: ${provinceStyle.color};">
        <div class="building-card-header" style="background: ${provinceStyle.bgColor};">
          <div class="building-card-header-left">
            <div class="building-province-icon" style="color: ${provinceStyle.color};">${provinceStyle.icon}</div>
            <div class="building-district">${building.districtName}</div>
          </div>
          ${protectionBadge}
        </div>
        <div class="building-content">
          <h3 class="building-title">${building.name}</h3>
          <div class="building-meta">
            <span class="building-era">📅 ${building.era}</span>
            <span class="building-type">${this.truncateText(building.type, 12)}</span>
          </div>
          <p class="building-desc">${shortDesc}</p>
          <div class="building-tags">
            ${sortedTags.slice(0, 5).map((tag, idx) => {
              const ts = this.getTagStyle(tag, idx);
              return `<span class="building-tag" style="background: ${ts.bg}; color: ${ts.color};">${ts.icon} ${tag}</span>`;
            }).join('')}
          </div>
        </div>
      </div>`;

    if (this._cache.buildingCards.size >= this._cacheLimits.buildingCards) {
      this._cache.buildingCards.delete(this._cache.buildingCards.keys().next().value);
    }
    this._cache.buildingCards.set(cacheKey, cardHTML);
    return cardHTML;
  },

  createSearchResultCard(building) {
    const cacheKey = 'search_' + building.name;
    if (this._cache.searchCards.has(cacheKey)) return this._cache.searchCards.get(cacheKey);
    const href = this.generateBuildingHash(building);
    const provinceStyle = this.getProvinceStyle(building.provinceId);
    const protectionBadge = this.generateProtectionBadge(building);
    const shortDesc = this.truncateText(building.description, 50);
    const matchReasonsHtml = building.matchReasons ?
      `<div class="match-reasons">${building.matchReasons.map(r => `<span class="match-reason">${r}</span>`).join('')}</div>` : '';
    const tags = building.tags || [];

    const cardHTML = `
      <div class="building-card search-result-card" data-href="${href}" style="border-left-color: ${provinceStyle.color};">
        <div class="building-card-header" style="background: ${provinceStyle.bgColor};">
          <div class="building-card-header-left">
            <div class="building-province-icon" style="color: ${provinceStyle.color};">${provinceStyle.icon}</div>
            <div class="building-district">${building.districtName}</div>
          </div>
          ${protectionBadge}
        </div>
        <div class="building-content">
          <h3 class="building-title">${building.name}</h3>
          ${matchReasonsHtml}
          <div class="building-meta">
            <span class="building-era">📅 ${building.era}</span>
            <span class="building-type">${this.truncateText(building.type, 12)}</span>
          </div>
          <p class="building-desc">${shortDesc}</p>
          <div class="building-tags">
            ${tags.slice(0, 4).map((tag, idx) => {
              const ts = this.getTagStyle(tag, idx);
              return `<span class="building-tag" style="background: ${ts.bg}; color: ${ts.color};">${ts.icon} ${tag}</span>`;
            }).join('')}
          </div>
        </div>
      </div>`;

    if (this._cache.searchCards.size >= this._cacheLimits.searchCards) {
      this._cache.searchCards.delete(this._cache.searchCards.keys().next().value);
    }
    this._cache.searchCards.set(cacheKey, cardHTML);
    return cardHTML;
  },

  getRelatedBuildings(building, limit = 4) {
    const allBuildings = this.getAllBuildings();
    const related = [];
    const buildingTags = building.tags || [];
    const sameDistrict = allBuildings.filter(b => b.district === building.district && b.name !== building.name);
    related.push(...sameDistrict);
    if (related.length < limit) {
      const sameTags = allBuildings.filter(b => {
        if (b.name === building.name || related.some(r => r.name === b.name)) return false;
        return (b.tags && buildingTags.some(tag => b.tags.includes(tag)));
      });
      related.push(...sameTags);
    }
    if (related.length < limit) {
      const sameEra = allBuildings.filter(b => {
        if (b.name === building.name || related.some(r => r.name === b.name)) return false;
        return b.era && b.era === building.era;
      });
      related.push(...sameEra);
    }
    return this.shuffleArray(related).slice(0, limit);
  },

  async renderHome(container) {
    this._destroyMap();

    container.innerHTML = `
      <div class="container"><div class="loading"><div class="loading-icon">🏛️</div><div>正在加载精彩内容...</div></div></div>`;

    await this._renderHomeTrails(container);
  },

  async renderMap(container) {
    this._destroyMap();
    this._activeEraFilter = 'all';
    this._activeCategoryFilter = 'all';

    const allProvinceIds = [...(this._provinceMeta?.provinces?.map(p => p.id) || []), 'cross'];

    // Render map shell immediately — user sees UI right away
    container.innerHTML = `
      <div class="map-page">
        <div class="map-timeline-bar" id="mapTimeline">
          <div class="era-timeline-all active" data-era="all">全部</div>
          <div class="era-timeline-track" id="eraTimelineTrack"></div>
        </div>

        <div class="map-legend" id="mapLegend">
          <div class="map-legend-item active" data-cat="all">
            <span class="map-legend-dot" style="background:#666;"></span>
            <span class="map-legend-label">全部分类</span>
          </div>
          ${Object.entries(this.buildingCategories).map(([key, cat]) =>
            `<div class="map-legend-item" data-cat="${key}">
              <span class="map-legend-dot" style="background:${cat.markerColor};"></span>
              <span class="map-legend-label">${cat.icon} ${cat.label}</span>
            </div>`
          ).join('')}
        </div>

        <div class="map-stats-bar">
          <div class="map-stats-inner">
            <div class="map-stat-item">
              <span class="map-stat-label" id="mapStatLabel">全部年代 · 全部分类</span>
              <span class="map-stat-num" id="mapStatTotal">0</span>
            </div>
            <span class="map-stat-sep">·</span>
            <div class="map-stat-item">
              <span class="map-stat-label">覆盖省份</span>
              <span class="map-stat-num" id="mapStatProvinces">${this._provinceMeta?.provinces?.length || 0}</span>
            </div>
            <span class="map-stat-sep">·</span>
            <div class="map-stat-item map-stat-loading" id="mapStatLoading">
              <span class="map-stat-num" id="mapStatLoaded" style="font-weight:600;color:var(--accent-color);">0</span>
              <span class="map-stat-label" style="font-size:0.6rem;">/<span id="mapTotalCount2">0</span></span>
              <span class="map-stat-remaining" id="mapStatRemaining"></span>
            </div>
          </div>
          <span class="map-stats-tip">⚠️ 港澳台建筑位置为近似坐标</span>
        </div>

        <div class="map-full-wrapper">
          <div id="mapFull" class="map-full"></div>
          <div class="map-progress-bar" id="mapProgressBar"><div class="map-progress-fill" id="mapProgressFill"></div></div>
        </div>
      </div>`;

    // --- Era timeline click handler ---
    const timeline = document.getElementById('mapTimeline');
    if (timeline) {
      timeline.addEventListener('click', e => {
        const allBtn = e.target.closest('.era-timeline-all');
        const block = e.target.closest('.era-timeline-block');
        if (allBtn) { this._setEraFilter('all'); return; }
        if (!block || block.classList.contains('empty')) return;
        const eraId = block.dataset.era;
        if (eraId) this._setEraFilter(eraId);
      });
    }

    // --- Category filter click handler ---
    const legendEl = document.getElementById('mapLegend');
    if (legendEl) {
      legendEl.addEventListener('click', e => {
        const item = e.target.closest('.map-legend-item');
        if (!item) return;
        const cat = item.dataset.cat;
        legendEl.querySelectorAll('.map-legend-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        this._setCategoryFilter(cat);
      });
    }

    // Init map immediately (empty, no markers yet)
    const mapEl = document.getElementById('mapFull');
    if (mapEl) this._initMap(mapEl);

    // Load data and add markers progressively in the background
    this._loadMapDataAsync(allProvinceIds);
  },

  async _loadMapDataAsync(allIds) {
    this._mapMarkers = [];
    const addedNames = new Set();
    let totalBuildings = 0;
    const dynastyCounts = {};
    const loadedProvinces = new Set();
    const batchSize = 5;

    const totalCount2El = document.getElementById('mapTotalCount2');
    const progressFill = document.getElementById('mapProgressFill');
    if (totalCount2El) totalCount2El.textContent = allIds.length;

    for (let i = 0; i < allIds.length; i += batchSize) {
      if (!this._markerCluster) return;
      const batch = allIds.slice(i, i + batchSize);
      try { await Promise.all(batch.map(id => this.loadProvinceData(id))); } catch (_) {}

      for (const id of batch) {
        const data = this._cache.provinceData.get(id);
        if (!data?.buildings) continue;
        loadedProvinces.add(id);
        for (const b of data.buildings) {
          const key = `${id}_${b.district}_${b.name}`;
          if (addedNames.has(key)) continue;
          if (b.lat === undefined || b.lng === undefined) continue;
          addedNames.add(key);
          const marker = this._createMapMarker(b);
          const eraId = this.getEarliestDynasty(b.era);
          this._mapMarkers.push({ marker, categoryKey: marker._categoryKey, eraId });
          if (this._passesMapFilters(marker._categoryKey, eraId)) {
            this._markerCluster.addLayer(marker);
          }
          totalBuildings++;
          if (eraId) dynastyCounts[eraId] = (dynastyCounts[eraId] || 0) + 1;
        }
      }

      // Update progress
      const loaded = loadedProvinces.size;
      const remaining = allIds.length - loaded;
      const pct = Math.round(loaded / allIds.length * 100);
      const statLoaded = document.getElementById('mapStatLoaded');
      const statTotal = document.getElementById('mapStatTotal');
      const statRemaining = document.getElementById('mapStatRemaining');
      if (statLoaded) statLoaded.textContent = loaded;
      if (statTotal) statTotal.textContent = totalBuildings;
      if (progressFill) progressFill.style.width = pct + '%';
      if (statRemaining) {
        statRemaining.textContent = remaining > 0 ? `· 剩余${remaining}省` : '';
        statRemaining.className = 'map-stat-remaining' + (remaining > 0 ? ' loading' : '');
      }

      // Render timeline after first batch
      if (i === 0) {
        this._renderTimeline(dynastyCounts);
        this._updateMapStats();
      }
    }

    this._updateMapStats();
    if (progressFill) progressFill.style.opacity = '0';
  },

  _renderTimeline(dynastyCounts) {
    const track = document.getElementById('eraTimelineTrack');
    if (!track) return;
    track.innerHTML = this.eras.filter(e => e.timeline !== false).map(e => {
      const count = dynastyCounts[e.id] || 0;
      const color = this._eraColors[e.id] || '#888';
      const startYr = isFinite(e.yearMin) ? e.yearMin : -50000;
      const rawSpan = Math.max(1, e.yearMax - startYr);
      const exponent = e.yearMax < -1000 ? 0.18 : 0.32;
      const flexVal = Math.max(3, Math.min(14, Math.pow(rawSpan, exponent)));
      return `<div class="era-timeline-block${count === 0 ? ' empty' : ''}"
        data-era="${e.id}"
        style="flex:${flexVal}; background:${color};"
        title="${e.name}（${count}处）">
        <span class="era-timeline-label">${e.name}</span>
      </div>`;
    }).join('');
  },

  async _renderHomeTrails(container) {
    const trailRegistry = this._trailRegistry || [];
    const selectedTrails = this.shuffleArray([...trailRegistry]).slice(0, 3);

    if (selectedTrails.length === 0) {
      return;
    }

    const trailDataArr = await Promise.all(selectedTrails.map(t => this._fetchJSON(`trail/${t.fileName}`)));
    const validTrails = [];
    for (let i = 0; i < selectedTrails.length; i++) {
      const data = trailDataArr[i];
      if (data) {
        const content = data.story || data.route;
        if (content) validTrails.push({ ...selectedTrails[i], data, content });
      }
    }

    if (validTrails.length === 0) return;

    const typeLabels = { game: '🎮 游戏', story: '📚 故事', route: '🗺️ 路线' };

    let sectionsHTML = '';
    const loadTasks = [];

    validTrails.forEach((trail, index) => {
      const content = trail.content;
      const chapters = content.chapters || content.stops || [];
      if (chapters.length === 0) return;
      const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
      const paragraphs = randomChapter.content.split('\n\n').filter(p => p.trim()).slice(0, 2);
      const containerId = `home-section-buildings-${index}`;

      sectionsHTML += `
        <div class="home-topic-section" onclick="App.navigateTo('?page=trail-detail&id=${trail.id}')" style="${index > 0 ? 'margin-top: 2rem;' : ''}">
          <div class="home-topic-header" style="display: flex; align-items: center; gap: 0.625rem; margin-bottom: 0.875rem; padding-bottom: 0.625rem; border-bottom: 2px solid ${trail.color}30; cursor: pointer;">
            <span style="font-size: 1.5rem;">${trail.icon}</span>
            <div>
              <div style="font-size: 1.0625rem; font-weight: 700; color: var(--text-primary);">${trail.title}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${typeLabels[trail.type] || ''} · ${trail.subtitle}</div>
            </div>
          </div>
          <div class="home-chapter-layout">
            <div class="home-chapter-content">
              <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.5rem 0;">
                <span>${randomChapter.icon}</span> ${randomChapter.title}
              </h3>
              <div style="font-size: 0.875rem; line-height: 1.7; color: var(--text-secondary);">
                ${paragraphs.map(p => `<p style="margin: 0 0 0.5rem 0;">${p}</p>`).join('')}
              </div>
            </div>
            <div class="home-featured-buildings" id="${containerId}">
              <div style="flex:1;min-width:0;padding:1rem;text-align:center;color:var(--text-muted);font-size:0.875rem;">🏛️ 加载中...</div>
            </div>
          </div>
        </div>`;

      loadTasks.push({ trail, chapter: randomChapter, containerId, index });
    });

    const trailContainer = container.querySelector('.container');
    if (trailContainer) {
      trailContainer.innerHTML = sectionsHTML;
    }

    for (const task of loadTasks) {
      this._loadHomeFeaturedBuildings(task.trail, task.chapter, task.containerId);
    }
  },

  async _loadHomeFeaturedBuildings(trail, chapter, containerId) {
    const provincesToLoad = new Set();
    if (chapter.buildings) {
      chapter.buildings.forEach(b => { if (b?.province) provincesToLoad.add(b.province); });
    }
    if (provincesToLoad.size > 0) await this.loadProvinces([...provincesToLoad]);

    const container = document.getElementById(containerId);
    if (!container) return;

    if (chapter.buildings?.length > 0) {
      const shuffled = this.shuffleArray([...chapter.buildings]);
      const featured = shuffled.slice(0, 2)
        .map(b => this._resolveBuildingRef(b))
        .filter(b => b !== null);

      if (featured.length > 0) {
        container.innerHTML = featured.map(b => `
          <div class="home-featured-building" onclick="event.stopPropagation(); App.navigateTo('${this.generateBuildingHash(b)}')">
            ${this.createBuildingCard(b)}
          </div>`).join('');
      } else {
        container.style.display = 'none';
      }
    } else {
      container.style.display = 'none';
    }
  },

  renderProvinces(container) {
    const crossStyle = this.getProvinceStyle('cross');
    const provinces = this._provinceMeta?.provinces || [];
    container.innerHTML = `
      <div class="container">
        <h2 class="section-title"><span class="section-icon">🗺️</span> 省份</h2>
        <div class="province-grid">
          ${provinces.map(province => {
            const style = this.getProvinceStyle(province.id);
            return `<div class="province-card ${province.count > 0 ? 'has-data' : 'no-data'}" data-nav href="?page=province&id=${province.id}" style="border-left-color: ${style.color};">
              <div class="province-icon" style="background: ${style.bgColor}; color: ${style.color};">${style.icon}</div>
              <div class="province-info">
                <div class="province-name">${province.name}</div>
                <div class="province-count">${province.count > 0 ? province.count + '处' : '暂无数据'}</div>
              </div>
            </div>`;
          }).join('')}
        </div>
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light);">
          <h3 class="section-title" style="font-size: 1rem;"><span class="section-icon">🌊</span> 跨省文物保护单位</h3>
          <div class="province-card" data-nav href="?page=cross" style="border-left-color: ${crossStyle.color}; max-width: 400px;">
            <div class="province-icon" style="background: ${crossStyle.bgColor}; color: ${crossStyle.color};">${crossStyle.icon}</div>
            <div class="province-info">
              <div class="province-name">跨省文物保护单位</div>
              <div class="province-count">点击查看全部</div>
            </div>
          </div>
        </div>
      </div>`;
  },

  async renderProvince(container) {
    const provinceId = this.state.currentProvince;
    const province = this.getProvinceById(provinceId);
    const provinceStyle = this.getProvinceStyle(provinceId);

    if (!province || province.count === 0) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">暂无数据</div><p>${province ? province.name : '该省份'}的文物保护单位数据正在整理中</p></div></div>`;
      return;
    }

    container.innerHTML = `<div class="container"><div class="loading"><div class="loading-icon">${provinceStyle.icon}</div><div>正在加载${province.name}数据...</div></div></div>`;

    const data = await this.loadProvinceData(provinceId);
    if (!data) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">⚠️</div><div class="empty-state-title">数据加载失败</div><p>无法加载${province.name}的数据</p></div></div>`;
      return;
    }

    const districts = this.getAllDistricts(provinceId);
    const allBuildings = this.getAllBuildings().filter(b => b.provinceId === provinceId);
    const buildingsByDistrict = {};
    allBuildings.forEach(b => {
      if (!buildingsByDistrict[b.district]) buildingsByDistrict[b.district] = [];
      buildingsByDistrict[b.district].push(b);
    });

    const districtsWithData = districts.filter(d => {
      const b = buildingsByDistrict[d.id];
      return b && b.length > 0;
    });

    const getEraSummary = (buildings) => {
      const eras = {};
      buildings.forEach(b => { if (b.era) eras[b.era] = (eras[b.era] || 0) + 1; });
      return Object.entries(eras).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([era, count]) => `${era}(${count})`).join(' · ');
    };

    const getTagSummary = (buildings) => {
      const tags = new Set();
      buildings.forEach(b => { if (b.tags) b.tags.forEach(tag => tags.add(tag)); });
      return this.shuffleArray([...tags]).slice(0, 7);
    };

    const protectionLabel = this.getProtectionLabel(provinceId);

    container.innerHTML = `
      <div class="container">
        <div class="province-header" style="background: linear-gradient(135deg, ${provinceStyle.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${provinceStyle.color}25;">
          <div class="province-header-icon" style="background: ${provinceStyle.color};">${provinceStyle.icon}</div>
          <div class="province-header-info">
            <h2 class="section-title" style="margin: 0;">${province.name}</h2>
            <p style="color: var(--text-secondary); margin: 0.5rem 0 0 0;">共有 <strong style="color: ${provinceStyle.color};">${province.count}</strong> 处${protectionLabel}</p>
          </div>
        </div>
        <div class="district-grid-cards">
          ${districtsWithData.map(district => {
            const districtBuildings = buildingsByDistrict[district.id] || [];
            const eraSummary = getEraSummary(districtBuildings);
            const tagSummary = getTagSummary(districtBuildings);
            const hasHeritage = districtBuildings.some(b => b.worldHeritage);
            const shuffledBuildings = this.shuffleArray([...districtBuildings]);
            const featuredBuildings = shuffledBuildings.slice(0, 7);
            return `
              <div class="district-grid-card" data-nav href="?page=district&pid=${provinceId}&did=${district.id}" style="border-top-color: ${provinceStyle.color};">
                <div class="district-grid-card-header">
                  <span class="district-grid-card-name">${district.name}</span>
                  ${hasHeritage ? '<span class="district-grid-heritage">🌍</span>' : ''}
                </div>
                <div class="district-grid-card-count">${districtBuildings.length} 处${protectionLabel}</div>
                ${eraSummary ? `<div class="district-grid-card-eras">${eraSummary}</div>` : ''}
                <div class="district-grid-card-examples">${featuredBuildings.map(b => `<div class="district-grid-card-example">🏛️ ${b.name}</div>`).join('')}</div>
                <div class="district-grid-card-tags">
                  ${tagSummary.map((tag, idx) => {
                    const ts = this.getTagStyle(tag, idx);
                    return `<span class="district-grid-tag" style="background: ${ts.bg}; color: ${ts.color};">${ts.icon} ${tag}</span>`;
                  }).join('')}
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  async renderDistrict(container) {
    const provinceId = this.state.currentProvince;
    const districtId = this.state.currentDistrict;
    await this.loadProvinceData(provinceId);

    const province = this.getProvinceById(provinceId);
    const district = this.getDistrictData(provinceId, districtId);
    const provinceStyle = this.getProvinceStyle(provinceId);

    if (!district) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">📍</div><div class="empty-state-title">未找到该区县</div></div></div>`;
      return;
    }

    const buildings = this.getBuildingsByDistrict(provinceId, districtId);
    const protectionLabel = this.getProtectionLabel(provinceId);

    container.innerHTML = `
      <div class="container">
        <div class="district-header" style="background: linear-gradient(135deg, ${provinceStyle.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${provinceStyle.color}25;">
          <div class="district-header-icon" style="background: ${provinceStyle.color};">📍</div>
          <div class="district-header-info">
            <h2 class="section-title" style="margin: 0;">${province.name} - ${district.name}</h2>
            <p style="color: var(--text-secondary); margin: 0.5rem 0 0 0;">共有 <strong style="color: ${provinceStyle.color};">${district.count}</strong> 处${protectionLabel}</p>
          </div>
        </div>
        <div class="building-grid">${buildings.map(b => this.createBuildingCard(b)).join('')}</div>
      </div>`;
  },

  async renderBuilding(container) {
    const buildingName = this.state.currentBuildingName;
    let building = this.findBuildingByFullPath(buildingName);

    if (!building) {
      const allProvinceIds = [...(this._provinceMeta?.provinces?.map(p => p.id) || []), 'cross'];
      await this.loadProvinces(allProvinceIds);
      building = this.findBuildingByFullPath(buildingName);
    }

    if (!building) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">🏛️</div><div class="empty-state-title">未找到该建筑</div></div></div>`;
      return;
    }

    const provinceStyle = this.getProvinceStyle(building.provinceId);
    const relatedBuildings = this.getRelatedBuildings(building, 4);

    container.innerHTML = `
      <div class="container">
        <article class="building-detail">
          <header class="building-detail-header" style="border-left-color: ${provinceStyle.color};">
            <div class="building-detail-icon" style="background: ${provinceStyle.bgColor}; color: ${provinceStyle.color};">🏛️</div>
            <div class="building-detail-title-wrapper">
              <h2 class="building-detail-title">${building.name}</h2>
              <p class="building-detail-location">
                <span class="location-icon">📍</span> ${building.location}
                <span class="map-links-inline">
                  <a href="https://ditu.amap.com/search?query=${encodeURIComponent(building.name)}" target="_blank" class="map-link-inline amap" title="高德地图">🗺️</a>
                  <a href="https://www.google.com/maps/search/${encodeURIComponent(building.location)}" target="_blank" class="map-link-inline google" title="谷歌地图">🌐</a>
                </span>
              </p>
            </div>
          </header>
          <div class="building-detail-sections">
            <div class="building-detail-section">
              <h3><span class="section-icon">📋</span> 基本信息</h3>
              <div class="info-grid">
                <div class="info-item"><span class="info-label">年代</span><span class="info-value">${building.era}</span></div>
                <div class="info-item"><span class="info-label">类型</span><span class="info-value">${building.type}</span></div>
                <div class="info-item"><span class="info-label">所在地区</span><span class="info-value">${building.province} ${building.districtName}</span></div>
                <div class="info-item"><span class="info-label">保护级别</span><span class="info-value">${building.protectionLevel}</span></div>
                <div class="info-item"><span class="info-label">公布批次</span><span class="info-value">${building.protectionBatch}</span></div>
                ${building.worldHeritage ? `<div class="info-item heritage"><span class="info-label">世界遗产</span><span class="info-value">${building.worldHeritageYear}年列入 🌍</span></div>` : ''}
              </div>
            </div>
            <div class="building-detail-section"><h3><span class="section-icon">✨</span> 特色介绍</h3><p class="detail-paragraph">${building.description}</p></div>
            <div class="building-detail-section"><h3><span class="section-icon">📜</span> 历史背景</h3><p class="detail-paragraph">${building.history}</p></div>
            <div class="building-detail-section"><h3><span class="section-icon">🏗️</span> 建筑风格</h3><p class="detail-paragraph">${building.architecture}</p></div>
            <div class="building-detail-section"><h3><span class="section-icon">💎</span> 特色与价值</h3><p class="detail-paragraph">${building.features}</p></div>
            ${building.sections ? `
            <div class="building-detail-section"><h3><span class="section-icon">🗺️</span> 分段信息</h3>
              <div class="sections-grid">${building.sections.map(s => `<div class="section-card"><div class="section-name">${s.name}</div><div class="section-province">${s.province}</div></div>`).join('')}</div>
            </div>` : ''}
            <div class="building-detail-section">
              <h3><span class="section-icon">🏷️</span> 标签</h3>
              <div class="building-detail-tags">
                ${(building.tags || []).map((tag, idx) => {
                  const ts = this.getTagStyle(tag, idx);
                  return `<span class="building-detail-tag" data-nav href="?page=tag&name=${encodeURIComponent(tag)}" style="background: ${ts.bg}; color: ${ts.color}; border-color: ${ts.color}30;"><span class="tag-icon">${ts.icon}</span> ${tag}</span>`;
                }).join('')}
              </div>
            </div>
            <div class="building-detail-section">
              <h3><span class="section-icon">🎬</span> 相关视频</h3>
              <p class="video-hint">点击下方按钮搜索「${building.name}」的短视频</p>
              <div class="video-links">
                <a href="https://www.douyin.com/search/${encodeURIComponent(building.name)}" target="_blank" rel="noopener" class="video-link douyin"><span class="video-link-icon">🎵</span><span class="video-link-label">抖音</span></a>
                <a href="https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(building.name)}" target="_blank" rel="noopener" class="video-link xiaohongshu"><span class="video-link-icon">📕</span><span class="video-link-label">小红书</span></a>
                <a href="https://search.bilibili.com/all?keyword=${encodeURIComponent(building.name)}" target="_blank" rel="noopener" class="video-link bilibili"><span class="video-link-icon">📺</span><span class="video-link-label">哔哩哔哩</span></a>
              </div>
            </div>
          </div>
        </article>
        ${relatedBuildings.length > 0 ? `
        <section class="related-buildings-section">
          <h2 class="section-title"><span class="section-icon">🔗</span> 相关推荐</h2>
          <p class="related-hint">同地区或同类型的其他文物保护单位</p>
          <div class="building-grid">${relatedBuildings.map(b => this.createBuildingCard(b)).join('')}</div>
        </section>` : ''}
      </div>`;
  },

  _renderTagsAsync(container) {
    const tags = this.getAllTags();
    if (tags.length === 0) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">🏷️</div><div class="empty-state-title">暂无标签数据</div></div></div>`;
      return;
    }
    const maxCount = Math.max(...tags.map(t => t.count));
    const minCount = Math.min(...tags.map(t => t.count));
    container.innerHTML = `
      <div class="container">
        <div class="tags-cloud-modern">
          ${tags.map((tag, index) => {
            const ts = this.getTagStyle(tag.name, index);
            const size = minCount === maxCount ? 16 : 14 + (tag.count - minCount) / (maxCount - minCount) * 10;
            return `<span class="tag-modern" data-nav href="?page=tag&name=${encodeURIComponent(tag.name)}" style="font-size: ${size}px; background: ${ts.bg}; color: ${ts.color}; border: 1px solid ${ts.color}30;">
              <span class="tag-modern-icon">${ts.icon}</span>
              <span class="tag-modern-name">${tag.name}</span>
              <span class="tag-modern-count" style="background: ${ts.color}20;">${tag.count}</span>
            </span>`;
          }).join('')}
        </div>
      </div>`;
  },

  renderTags(container) {
    if (this._loadedProvinceData.size > 0) {
      this._renderTagsAsync(container);
    } else {
      container.innerHTML = `<div class="container"><div class="loading"><div class="loading-icon">🔄</div><div>正在加载标签数据...</div></div></div>`;
      this._ensureDataLoaded().then(() => this._renderTagsAsync(container));
    }
  },

  renderTagResults(container) {
    const decodedTag = decodeURIComponent(this.state.currentTag);
    const doRender = () => {
      const buildings = this.getBuildingsByTag(decodedTag);
      const ts = this.getTagStyle(decodedTag, 0);
      container.innerHTML = `
        <div class="container">
          <div class="tag-header" style="background: ${ts.bg}; border: 1px solid ${ts.color}30;">
            <div class="tag-header-icon" style="background: ${ts.color};">${ts.icon}</div>
            <div class="tag-header-info">
              <h2 class="section-title" style="margin: 0;">标签：${decodedTag}</h2>
              <p style="color: var(--text-secondary); margin: 0.5rem 0 0 0;">共找到 <strong style="color: ${ts.color};">${buildings.length}</strong> 处相关建筑</p>
            </div>
          </div>
          ${buildings.length > 0 ? `<div class="building-grid">${buildings.map(b => this.createBuildingCard(b)).join('')}</div>` : `<div class="empty-state"><div class="empty-state-icon">🏷️</div><div class="empty-state-title">未找到相关建筑</div></div>`}
        </div>`;
    };
    if (this._loadedProvinceData.size > 0) {
      doRender();
    } else {
      container.innerHTML = `<div class="container"><div class="loading"><div class="loading-icon">🔄</div><div>正在加载数据...</div></div></div>`;
      this._ensureDataLoaded().then(doRender);
    }
  },

  _searchDebounceTimer: null,

  renderSearchPage(container) {
    container.innerHTML = `
      <div class="container">
        <div class="search-page">
          <div class="search-page-input-wrapper">
            <input type="text" class="search-page-input" placeholder="搜索建筑名称、地点、年代..." id="searchPageInput" autocomplete="off">
            <button class="search-page-clear" id="searchPageClear" style="display: none;">×</button>
          </div>
          <div class="search-page-results" id="searchPageResults">
            <div class="search-page-hint"><p>输入关键词搜索</p></div>
          </div>
        </div>
      </div>`;

    this._ensureDataLoaded();

    const input = document.getElementById('searchPageInput');
    const clearBtn = document.getElementById('searchPageClear');
    const resultsContainer = document.getElementById('searchPageResults');

    if (input) {
      input.focus();
      input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (this._searchDebounceTimer) clearTimeout(this._searchDebounceTimer);
        if (query) {
          clearBtn.style.display = 'flex';
          this._searchDebounceTimer = setTimeout(() => this.renderSearchPageResults(query, resultsContainer), 250);
        } else {
          clearBtn.style.display = 'none';
          resultsContainer.innerHTML = '<div class="search-page-hint"><p>输入关键词搜索</p></div>';
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        resultsContainer.innerHTML = '<div class="search-page-hint"><p>输入关键词搜索</p></div>';
        input.focus();
      });
    }
  },

  renderSearchPageResults(query, container) {
    const results = this.searchBuildings(query);
    if (results.length === 0) {
      container.innerHTML = `
        <div class="search-page-empty">
          <div class="search-empty-icon">🔍</div>
          <div class="search-empty-title">未找到相关建筑</div>
          <p>请尝试其他关键词</p>
          <div class="search-tips"><p>💡 搜索提示：</p><ul><li>支持搜索建筑名称、地址、年代</li><li>支持搜索建筑描述和历史背景</li><li>支持搜索标签和保护批次</li></ul></div>
        </div>`;
      return;
    }
    container.innerHTML = `
      <div class="search-results-count">找到 <strong>${results.length}</strong> 处相关建筑 <span class="search-query-text">"${query}"</span></div>
      <div class="building-grid">${results.map(b => this.createSearchResultCard(b)).join('')}</div>`;
  },

  async renderCrossProvince(container) {
    container.innerHTML = `<div class="container"><div class="loading"><div class="loading-icon">🔄</div><div>正在加载跨省数据...</div></div></div>`;
    const data = await this.loadProvinceData('cross');
    if (!data || !data.buildings) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">暂无数据</div></div></div>`;
      return;
    }
    const crossStyle = this.getProvinceStyle('cross');
    container.innerHTML = `
      <div class="container">
        <h2 class="section-title"><span class="section-icon">🌊</span> 跨省文物保护单位</h2>
        <div class="building-grid">
          ${data.buildings.map(b => this.createBuildingCard({ ...b, province: '跨省', provinceId: 'cross' })).join('')}
        </div>
      </div>`;
  },

  renderTrailList(container) {
    const registry = this._trailRegistry || [];
    const typeFilter = this.state.currentTrailType;
    const filtered = typeFilter ? registry.filter(t => t.type === typeFilter) : registry;

    const typeLabels = { game: '🎮 游戏', story: '📚 故事', route: '🗺️ 路线' };

    container.innerHTML = `
      <div class="container">
        <h2 class="section-title"><span class="section-icon">👣</span> 足迹</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">玩游戏，听故事，走古道，看建筑——全方位的中国古建之旅</p>
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
          <a href="?page=trail" class="trail-filter-btn ${!typeFilter ? 'active' : ''}" data-nav>全部</a>
          ${Object.entries(typeLabels).map(([type, label]) =>
            `<a href="?page=trail&type=${type}" class="trail-filter-btn ${typeFilter === type ? 'active' : ''}" data-nav>${label}</a>`
          ).join('')}
        </div>
        <div class="topics-grid">
          ${filtered.map(trail => `
            <div class="topic-card" data-nav href="?page=trail-detail&id=${trail.id}" style="border-left-color: ${trail.color};">
              <div class="topic-card-icon" style="background: ${trail.bgColor}; color: ${trail.color};">${trail.icon}</div>
              <div class="topic-card-content">
                <div class="topic-card-title">${trail.title}</div>
                <div class="topic-card-subtitle">${typeLabels[trail.type] || ''} · ${trail.subtitle}</div>
                <div class="topic-card-desc">${trail.description}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  },

  async renderTrailDetail(container) {
    const trailId = this.state.currentTrailId;
    const meta = this._trailRegistry?.find(t => t.id === trailId);
    if (!meta) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">👣</div><div class="empty-state-title">足迹未找到</div></div></div>`;
      return;
    }

    const data = await this._fetchJSON(`trail/${meta.fileName}`);
    if (!data) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">⚠️</div><div class="empty-state-title">加载失败</div></div></div>`;
      return;
    }

    if (meta.type === 'route') {
      await this._renderRouteDetail(container, meta, data);
    } else {
      await this._renderStoryDetail(container, meta, data);
    }
  },

  async _renderStoryDetail(container, meta, data) {
    const story = data.story;
    if (!story) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">📚</div><div class="empty-state-title">内容未找到</div></div></div>`;
      return;
    }

    const provincesToLoad = new Set();
    story.chapters?.forEach(ch => {
      ch.buildings?.forEach(b => { if (b?.province) provincesToLoad.add(b.province); });
    });
    if (provincesToLoad.size > 0) await this.loadProvinces([...provincesToLoad]);

    container.innerHTML = `
      <div class="container">
        <div class="topic-detail-header" style="background: linear-gradient(135deg, ${meta.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${meta.color}25;">
          <div class="topic-detail-icon" style="background: ${meta.color};">${meta.icon}</div>
          <div class="topic-detail-info">
            <h1 class="topic-detail-title">${story.title}</h1>
            <p class="topic-detail-subtitle">${meta.subtitle}</p>
          </div>
        </div>
        <div class="topic-intro">${story.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
        <div class="topic-chapters">
          ${story.chapters.map((chapter, index) => {
            const chapterBuildings = (chapter.buildings || [])
              .map(b => this._resolveBuildingRef(b))
              .filter(b => b !== null);
            return `
              <div class="topic-chapter" id="chapter-${index}">
                <h3 class="topic-chapter-title"><span class="topic-chapter-icon">${chapter.icon}</span>${chapter.title}</h3>
                <div class="topic-chapter-content">${chapter.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
                ${chapterBuildings.length > 0 ? `
                  <div class="topic-chapter-buildings">
                    <h4 class="topic-buildings-title">🏛️ 相关古建</h4>
                    <div class="building-grid compact">${chapterBuildings.map(b => this.createBuildingCard(b)).join('')}</div>
                  </div>` : ''}
              </div>`;
          }).join('')}
        </div>
        ${story.allBuildings?.length > 0 ? `
          <div class="topic-all-buildings">
            <h3 class="section-title"><span class="section-icon">🏛️</span> 涉及古建一览</h3>
            <div class="building-grid">
              ${story.allBuildings.map(b => {
                const building = this._resolveBuildingRef(b);
                return building ? this.createBuildingCard(building) : '';
              }).join('')}
            </div>
          </div>` : ''}
      </div>`;
  },

  async _renderRouteDetail(container, meta, data) {
    const route = data.route;
    if (!route) {
      container.innerHTML = `<div class="container"><div class="empty-state"><div class="empty-state-icon">🗺️</div><div class="empty-state-title">路线未找到</div></div></div>`;
      return;
    }

    const provincesToLoad = new Set();
    route.stops?.forEach(stop => {
      stop.buildings?.forEach(b => { if (b?.province) provincesToLoad.add(b.province); });
    });
    if (provincesToLoad.size > 0) await this.loadProvinces([...provincesToLoad]);

    const totalStops = route.stops?.length || 0;

    container.innerHTML = `
      <div class="container">
        <div class="topic-detail-header" style="background: linear-gradient(135deg, ${meta.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${meta.color}25;">
          <div class="topic-detail-icon" style="background: ${meta.color};">${meta.icon}</div>
          <div class="topic-detail-info">
            <h1 class="topic-detail-title">${route.title}</h1>
            <p class="topic-detail-subtitle">${meta.subtitle}</p>
          </div>
        </div>
        <div class="topic-intro">${route.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
        <div class="route-timeline" style="position: relative; margin: 2rem 0;">
          <div class="route-timeline-line" style="position: absolute; left: 24px; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, ${meta.color}40, ${meta.color}); border-radius: 3px;"></div>
          ${route.stops.map((stop, index) => {
            const isLast = index === totalStops - 1;
            const stopBuildings = (stop.buildings || [])
              .map(b => this._resolveBuildingRef(b))
              .filter(b => b !== null);
            return `
              <div class="route-stop" style="position: relative; padding-left: 64px; margin-bottom: ${isLast ? '0' : '2rem'};">
                <div class="route-stop-marker" style="position: absolute; left: 12px; top: 0; width: 28px; height: 28px; border-radius: 50%; background: ${meta.color}; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; border: 3px solid var(--bg-card); box-shadow: 0 0 0 3px ${meta.color}40; z-index: 1;">${index + 1}</div>
                <div class="route-stop-card">
                  <div style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-light); background: linear-gradient(135deg, ${meta.bgColor}80 0%, var(--bg-card) 100%);">
                    <div style="display: flex; align-items: center; gap: 0.625rem;">
                      <span style="font-size: 1.25rem;">${stop.icon}</span>
                      <div>
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0;">${stop.title}</h3>
                        ${stop.poet ? `<div style="font-size: 0.75rem; color: ${meta.color}; margin-top: 0.25rem;">📜 ${stop.poet}</div>` : ''}
                      </div>
                    </div>
                  </div>
                  ${stop.poem ? `<div style="padding: 1rem 1.25rem; background: var(--bg-secondary); border-bottom: 1px solid var(--border-light);"><pre style="font-family: inherit; font-size: 0.875rem; line-height: 1.8; color: var(--text-primary); margin: 0; white-space: pre-wrap;">${stop.poem}</pre></div>` : ''}
                  <div style="padding: 1rem 1.25rem;"><div class="topic-chapter-content" style="font-size: 0.875rem; line-height: 1.7; color: var(--text-secondary);">${stop.content.split('\n\n').map(p => `<p style="margin: 0 0 0.5rem 0;">${p}</p>`).join('')}</div></div>
                  ${stopBuildings.length > 0 ? `<div style="padding: 0 1.25rem 1rem;"><div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.75rem;">🏛️ 相关古建</div><div class="building-grid compact">${stopBuildings.map(b => this.createBuildingCard(b)).join('')}</div></div>` : ''}
                </div>
                ${!isLast ? `<div style="display: flex; align-items: center; justify-content: center; margin-top: 1rem; margin-left: -64px;"><div style="display: flex; align-items: center; gap: 0.5rem; color: ${meta.color}; font-size: 0.75rem; font-weight: 600;"><span>↓</span><span>前往下一站</span><span>↓</span></div></div>` : ''}
              </div>`;
          }).join('')}
        </div>
        ${route.allBuildings?.length > 0 ? `
          <div class="topic-all-buildings">
            <h3 class="section-title"><span class="section-icon">🏛️</span> 路线涉及古建一览</h3>
            <div class="building-grid">${route.allBuildings.map(b => { const building = this._resolveBuildingRef(b); return building ? this.createBuildingCard(building) : ''; }).join('')}</div>
          </div>` : ''}
      </div>`;
  },

  getEarliestDynasty(eraStr) {
    if (!eraStr || eraStr === '待考' || eraStr.startsWith('不可考') || eraStr.startsWith('估计')) return null;
    const matches = [];
    for (const e of this.eras) {
      for (const kw of e.keywords) {
        if (eraStr.includes(kw)) {
          matches.push(e);
          break;
        }
      }
    }
    if (matches.length > 0) return matches[0].id;
    const yearMatch = eraStr.match(/(\d{3,4})年/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      if (year > -500 && year < 2030) {
        for (const e of this.eras) {
          if (year >= e.yearMin && year <= e.yearMax) return e.id;
        }
      }
    }
    return null;
  },

};

document.addEventListener('DOMContentLoaded', () => App.init());