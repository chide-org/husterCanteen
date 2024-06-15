// 页面加载完成时执行的函数
window.onload = function () {
  if (document.getElementById("action").value === "addDish")
    fetchCanteens("canteenId");
};

// 获取所有食堂信息并动态生成下拉列表选项
function fetchCanteens(selectElementId) {
  fetch(url, {
    method: "GET", // 使用 GET 请求获取所有食堂信息
  })
    .then((response) => response.json())
    .then((JSON) => {
      const canteenSelect = document.getElementById(selectElementId);
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
function ondeleteCanteenChange() {
  const canteenSearch = document.getElementById("deleteCanteen").value;
  const dishSearch = document.getElementById("deleteDish");
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

// 根据选择的操作类型动态生成相应的表单元素
document.getElementById("action").addEventListener("change", function () {
  const action = this.value;
  const formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = ""; // 清空之前的表单内容

  if (action === "addCanteen") {
    formContainer.innerHTML = `
            <label for="canteenName">食堂名称：</label>
            <input type="text" id="canteenName" name="canteenName" required>
        `;
  } else if (action === "addDish") {
    formContainer.innerHTML = `
            <label for="canteenId">食堂：</label>
            <select id="canteenId" name="canteenId" required>
                <option value="">选择食堂</option>
            </select>
            <label for="dishName">菜品名称：</label>
            <input type="text" id="dishName" name="dishName" required>
            <label for="priceRange">价格范围：</label>
            <input type="text" id="priceRange" name="priceRange" placeholder="例如：10-20" required>
            <label for="flavor">评价：</label>
            <input type="text" id="flavor" name="flavor" required>
        `;
    fetchCanteens("canteenId"); // 动态加载食堂下拉列表
  } else if (action === "deleteDish") {
    formContainer.innerHTML = `
            <label for="deleteCanteen">选择食堂：</label>
            <select id="deleteCanteen" name="deleteCanteen" required onchange="ondeleteCanteenChange()">
                <option value="">选择食堂</option>
            </select>
            <label for="deleteDish">选择菜品：</label>
            <select id="deleteDish" name="deleteDish" required>
                <option value="">选择菜品</option>
            </select>
        `;
    fetchCanteens("deleteCanteen"); // 动态加载食堂下拉列表
  }
});

// 提交表单
function submitForm() {
  const action = document.getElementById("action").value;
  let requestData = {};

  if (action === "addCanteen") {
    requestData = {
      type: "addCanteen",
      canteen_name: document.getElementById("canteenName").value,
    };
  } else if (action === "addDish") {
    requestData = {
      type: "addDish",
      canteen_id: document.getElementById("canteenId").value,
      food_name: document.getElementById("dishName").value,
      price_range: document.getElementById("priceRange").value,
      flavor: document.getElementById("flavor").value,
    };
  } else if (action === "deleteDish") {
    requestData = {
      type: "deleteDish",
      dish_id: document.getElementById("deleteDish").value,
    };
  }

  // POST 请求
  fetchData(url, requestData)
    .then((JSON) => {
      alert("操作成功！");
      location.reload(); // 成功则刷新页面
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("操作失败！");
    });
}
