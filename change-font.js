
  function ranges() {
    function updateFontSize(value) {
      const sizes = {
        "f1": 12,
        "f2": 16,
        "f3": 20,
        "f4": 24,
        "f5": 28
      };

      const fontSize = sizes[value]; // تحقق من وجود الاختصار داخل قاموس الأحجام
      if (fontSize !== undefined) {
        const elements = document.querySelectorAll(".ntfC p");
        elements.forEach(element => {
          element.style.fontSize = fontSize + "px";
          element.style.lineHeight = "1.5"; // تعيين ارتفاع السطر إلى قيمة ثابتة لتجنب التداخل
        });

        // حفظ القيمة في LocalStorage
        localStorage.setItem("lastValidValue", lastValidValue);
        localStorage.setItem("lastValidShortcut", lastValidShortcut);
      }
    }

    const searchInInput = document.getElementById("searchIn");
    let lastValidValue = ""; // إنشاء متغير لتخزين آخر قيمة صالحة
    let lastValidShortcut = ""; // إنشاء متغير لتخزين آخر اختصار صالح

    // استرجاع القيمة المحفوظة من LocalStorage عند تحميل الصفحة
    const storedValue = localStorage.getItem("lastValidValue");
    if (storedValue && (storedValue === "f1" || storedValue === "f2" || storedValue === "f3" || storedValue === "f4" || storedValue === "f5")) {
      lastValidValue = storedValue;
      searchInInput.value = lastValidValue; // تحديث قيمة حقل البحث
    }

    const storedShortcut = localStorage.getItem("lastValidShortcut");
    if (storedShortcut) {
      lastValidShortcut = storedShortcut;
      searchInInput.placeholder = "جرب البحث";
    }

    const resizeObserver = new ResizeObserver(entries => {
      const value = searchInInput.value.trim();
      if (value === "f1" || value === "f2" || value === "f3" || value === "f4" || value === "f5") {
        lastValidValue = value; // حفظ القيمة فقط إذا كانت صالحة
        // حذف الاختصار من حقل البحث
        searchInInput.value = "";
      }
      updateFontSize(lastValidValue); // استخدام آخر قيمة صالحة لتحديث الحجم
    });

    resizeObserver.observe(searchInInput);

    searchInInput.addEventListener("input", function (e) {
      const value = e.target.value.trim();
      if (value === "f1" || value === "f2" || value === "f3" || value === "f4" || value === "f5") {
        lastValidValue = value; // حفظ القيمة فقط إذا كانت صالحة
        // حذف الاختصار من حقل البحث
        searchInInput.value = "";
      } else {
        lastValidShortcut = value; // حفظ اسم الاختصار إذا لم يكن معروفًا
        searchInInput.placeholder = "جرب البحث";
      }

      const bubles = document.getElementsByClassName("buble");
      for (let i = 0; i < bubles.length; i++) {
        if (i < Math.floor(lastValidValue / 20)) { // استخدام آخر قيمة صالحة هنا أيضًا
          bubles[i].classList.add("act");
        } else {
          bubles[i].classList.remove("act");
        }
      }

      updateFontSize(lastValidValue); // استخدام آخر قيمة صالحة لتحديث الحجم
    });
  }

  ranges();
