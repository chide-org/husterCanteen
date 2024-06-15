// 页面加载完成时执行的函数
window.onload = function () {
  // 获取所有食堂信息并动态生成下拉列表选项
  fetchCanteens();
  onCanteenChange();
};

// 获取所有食堂信息并动态生成下拉列表选项
function fetchCanteens() {
  fetch(url, {
    method: "GET", // 使用 GET请求获取所有食堂信息
  })
    .then((response) => response.json())
    .then((JSON) => {
      const canteenSelect = document.getElementById("canteen");
      canteenSelect.innerHTML = '<option value="">选择食堂</option>';
      JSON.data.forEach((canteen) => {
        canteenSelect.innerHTML += `<option value="${canteen.canteen_id}">${canteen.canteen_name}</option>`;
      });
    })
    .catch((error) => {
      console.error("Error fetching canteens:", error);
    });
}

// 食堂下拉列表改变时触发的事件
function onCanteenChange() {
  const canteenSearch = document.getElementById("canteen").value;
  const dishSearch = document.getElementById("dish");

  // 根据食堂获取该食堂的菜品信息
  fetchData(url, {
    type: "search",
    canteenSearch: canteenSearch,
    dishSearch: "",
  })
    .then((JSON) => {
      dishSearch.innerHTML = '<option value="">选择菜品</option>';
      JSON.data.forEach((dish) => {
        dishSearch.innerHTML += `<option value="${dish.dish_id}">${dish.food_name}</option>`;
      });
    })
    .catch((error) => {
      console.error("Error fetching dishes:", error);
    });
}

// 查询菜品信息并显示在页面上
function submitQuery() {
  const canteenSearch = document.getElementById("canteen").value;
  const dishSearch = document.getElementById("dish").value;

  fetchData(url, {
    type: "search", // 添加 type 字段，值为 'search
    canteenSearch: canteenSearch,
    dishSearch: dishSearch,
  })
    .then((JSON) => {
      const resultContainer = document.getElementById("result");
      resultContainer.innerHTML = ""; // 清空之前的结果

      if (JSON.error) {
        resultContainer.innerHTML = `<p>Error: ${JSON.error}</p>`;
        return;
      }

      JSON.data.forEach((item) => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = `
          <h3>${item.food_name} - ${item.canteen_name}</h3>
          <p>价格: ${item.price_range}</p>
          <button class="like-btn" id=dish_${item.dish_id} value=1 onclick="handleLike(${item.dish_id},value)">点赞 ${item.likes}</button>
          <p>口味: ${item.flavor}</p>
          <p>更新日期: ${item.update_time}</p>
        `;
        resultContainer.appendChild(resultItem);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 处理点赞按钮点击事件
function handleLike(dish_id, value) {
  fetchData(url, {
    type: "like",
    dish_id: dish_id,
    add: value,
  })
    .then((data) => {
      // 在实际应用中，可以根据返回的数据更新点赞按钮的显示
      // 获取元素
      const element = document.getElementById(`dish_${dish_id}`);

      // 修改样式
      element.style.value = -1;
      element.style.backgroundColor = "rgba(170, 190, 255, .5)";

      alert("点赞成功！");
    })
    .catch((error) => {
      console.error("Error liking dish:", error);
      alert("点赞失败！");
    });
}
