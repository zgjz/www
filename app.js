// 应用主逻辑
const contentEl = document.getElementById('content');
const searchInput = document.querySelector('.search-box input');
let currentPath = [];

// 初始化页面
function init() {
    renderBreadcrumb();
    renderProvinces();
    setupSearch();
}

// 渲染面包屑导航
function renderBreadcrumb() {
    const breadcrumbEl = document.querySelector('.breadcrumb');
    breadcrumbEl.innerHTML = '<a href="#" onclick="goHome()">首页</a>';
    
    currentPath.forEach((item, index) => {
        breadcrumbEl.innerHTML += ` > <a href="#" onclick="navigateTo(${index})">${item.name}</a>`;
    });
}

// 导航到指定层级
function navigateTo(level) {
    currentPath = currentPath.slice(0, level + 1);
    
    // 根据当前路径重新渲染内容
    if (currentPath.length === 0) {
        renderProvinces();
    } else if (currentPath.length === 1) {
        renderCities(currentPath[0].name);
    } else if (currentPath.length === 2) {
        renderCounties(currentPath[0].name, currentPath[1].name);
    } else if (currentPath.length === 3) {
        renderBuildings(currentPath[0].name, currentPath[1].name, currentPath[2].name);
    }
    
    renderBreadcrumb();
}

// 返回首页
function goHome() {
    currentPath = [];
    renderProvinces();
    renderBreadcrumb();
}

// 渲染省份列表
function renderProvinces() {
    contentEl.innerHTML = '<h2>省级行政区</h2><div class="category" id="provinces"></div>';
    
    const provincesEl = document.getElementById('provinces');
    for (const province in provincesData) {
        const provinceEl = document.createElement('div');
        provinceEl.className = 'province-item';
        provinceEl.innerHTML = `<a href="#" onclick="selectProvince('${province}')">${province}</a>`;
        provincesEl.appendChild(provinceEl);
    }
}

// 选择省份
function selectProvince(province) {
    currentPath = [{ type: 'province', name: province }];
    renderCities(province);
    renderBreadcrumb();
}

// 渲染城市列表
function renderCities(province) {
    contentEl.innerHTML = `<h2>${province} - 市级行政区</h2><div class="category" id="cities"></div>`;
    
    const citiesEl = document.getElementById('cities');
    for (const city in provincesData[province]) {
        const cityEl = document.createElement('div');
        cityEl.className = 'city-item';
        cityEl.innerHTML = `<a href="#" onclick="selectCity('${province}', '${city}')">${city}</a>`;
        citiesEl.appendChild(cityEl);
    }
}

// 选择城市
function selectCity(province, city) {
    currentPath = [
        { type: 'province', name: province },
        { type: 'city', name: city }
    ];
    renderCounties(province, city);
    renderBreadcrumb();
}

// 渲染县区列表
function renderCounties(province, city) {
    contentEl.innerHTML = `<h2>${province} - ${city} - 县级行政区</h2><div class="category" id="counties"></div>`;
    
    const countiesEl = document.getElementById('counties');
    for (const county in provincesData[province][city]) {
        const countyEl = document.createElement('div');
        countyEl.className = 'county-item';
        countyEl.innerHTML = `<a href="#" onclick="selectCounty('${province}', '${city}', '${county}')">${county}</a>`;
        countiesEl.appendChild(countyEl);
    }
}

// 选择县区
function selectCounty(province, city, county) {
    currentPath = [
        { type: 'province', name: province },
        { type: 'city', name: city },
        { type: 'county', name: county }
    ];
    renderBuildings(province, city, county);
    renderBreadcrumb();
}

// 渲染建筑列表
function renderBuildings(province, city, county) {
    contentEl.innerHTML = `<h2>${province} - ${city} - ${county} - 古建筑</h2><ul class="building-list"></ul>`;
    
    const buildings = provincesData[province][city][county];
    const listEl = contentEl.querySelector('ul');
    
    buildings.forEach(building => {
        const itemEl = document.createElement('li');
        itemEl.className = 'building-item';
        itemEl.innerHTML = `<strong>${building.name}</strong>: ${building.description}`;
        listEl.appendChild(itemEl);
    });
}

// 设置搜索功能
function setupSearch() {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query.length < 2) return;
        
        const results = allBuildings.filter(building => 
            building.name.toLowerCase().includes(query) || 
            building.description.toLowerCase().includes(query)
        );
        
        renderSearchResults(results);
    });
}

// 渲染搜索结果
function renderSearchResults(results) {
    contentEl.innerHTML = `<h2>搜索结果</h2><ul class="building-list"></ul>`;
    
    const listEl = contentEl.querySelector('ul');
    results.forEach(building => {
        const itemEl = document.createElement('li');
        itemEl.className = 'building-item';
        itemEl.innerHTML = `<strong>${building.name}</strong>: ${building.description}`;
        listEl.appendChild(itemEl);
    });
}

// 启动应用
init();