// ════════ HEADER ════════
function toggleTheme() {
const html = document.documentElement;
html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
document.getElementById("themeIcon").innerHTML =
    html.dataset.theme === "dark"
    ? '<circle cx="12" cy="12" r="5" fill="currentColor"/><path stroke="currentColor" stroke-width="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'
    : '<path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
}
function toggleMenu() {
const m = document.getElementById("mobileMenu");
const h = document.getElementById("hamburger");
m.classList.toggle("open");
h.classList.toggle("open");
}

// ════════ TABS ════════
function showTab(id) {
document
    .querySelectorAll(".panel")
    .forEach((p) => p.classList.remove("active"));
document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
document.getElementById("tab-" + id).classList.add("active");
event.target.classList.add("active");
}

// ════════ BASIC CALC ════════
let expr = "",
justCalc = false;
function updateDisplay(val) {
document.getElementById("display").textContent = val || "0";
}
function inputNum(n) {
if (justCalc) {
    expr = "";
    justCalc = false;
}
expr += n;
updateDisplay(expr);
}
function inputOp(op) {
// Don't allow operator if expression is empty (nothing to operate on)
if (expr === "" && !justCalc) return;
// If last character is already an operator, replace it to prevent stacking
const lastChar = expr.slice(-1);
if (["+", "-", "*", "/"].includes(lastChar)) {
    expr = expr.slice(0, -1);
}
justCalc = false;
expr += op;
updateDisplay(expr);
}
function inputChar(c) {
if (justCalc && c !== "(" && c !== ")") justCalc = false;
expr += c;
updateDisplay(expr);
}
function clearAll() {
expr = "";
justCalc = false;
updateDisplay("0");
document.getElementById("expr").textContent = "";
}
function backspace() {
expr = expr.slice(0, -1);
updateDisplay(expr || "0");
}
function sqrtCalc() {
try {
    const r = Math.sqrt(parseFloat(expr));
    document.getElementById("expr").textContent = "√(" + expr + ")";
    expr = String(r);
    updateDisplay(r);
    justCalc = true;
} catch (e) {}
}
function squareCalc() {
try {
    const r = Math.pow(parseFloat(expr), 2);
    document.getElementById("expr").textContent = expr + "²";
    expr = String(r);
    updateDisplay(r);
    justCalc = true;
} catch (e) {}
}
function calculate() {
try {
    document.getElementById("expr").textContent = expr + " =";
    const res = Function('"use strict";return (' + expr + ")")();
    expr = String(parseFloat(res.toFixed(10)));
    updateDisplay(expr);
    justCalc = true;
} catch (e) {
    updateDisplay("Error");
    expr = "";
}
}
// Keyboard support
document.addEventListener("keydown", (e) => {
const panel = document.querySelector(".panel.active");
if (!panel || panel.id !== "tab-basic") return;
if (e.key >= "0" && e.key <= "9") inputNum(e.key);
else if (e.key === "+") inputOp("+");
else if (e.key === "-") inputOp("-");
else if (e.key === "*") inputOp("*");
else if (e.key === "/") {
    e.preventDefault();
    inputOp("/");
} else if (e.key === ".") inputChar(".");
else if (e.key === "Enter" || e.key === "=") calculate();
else if (e.key === "Backspace") backspace();
else if (e.key === "Escape") clearAll();
else if (e.key === "(") inputChar("(");
else if (e.key === ")") inputChar(")");
else if (e.key === "%") inputChar("%");
});

// ════════ TRIG ════════
function calcTrig(fn) {
const v = parseFloat(document.getElementById("trigVal").value);
const unit = document.getElementById("trigUnit").value;
if (isNaN(v)) {
    document.getElementById("trigResultVal").textContent =
    "Enter a value";
    return;
}
const rad = unit === "deg" ? (v * Math.PI) / 180 : v;
let result;
const fns = {
    sin: () => Math.sin(rad),
    cos: () => Math.cos(rad),
    tan: () => Math.tan(rad),
    asin: () => Math.asin(v) * (unit === "deg" ? 180 / Math.PI : 1),
    acos: () => Math.acos(v) * (unit === "deg" ? 180 / Math.PI : 1),
    atan: () => Math.atan(v) * (unit === "deg" ? 180 / Math.PI : 1),
    sinh: () => Math.sinh(rad),
    cosh: () => Math.cosh(rad),
    tanh: () => Math.tanh(rad),
    log: () => Math.log10(v),
    ln: () => Math.log(v),
    exp: () => Math.exp(v),
};
result = fns[fn] ? fns[fn]() : NaN;
document.getElementById("trigResultVal").textContent = isNaN(result)
    ? "Undefined"
    : parseFloat(result.toFixed(10));
}

// ════════ GEOMETRY ════════
const shapes = [
"circle",
"rectangle",
"triangle",
"cube",
"cylinder",
"sphere",
"cone",
];
function showShape(s) {
shapes.forEach((sh) => {
    document.getElementById("shape-" + sh).style.display =
    sh === s ? "block" : "none";
    document.getElementById("r-" + sh) &&
    (document.getElementById("r-" + sh).style.display = "none");
});
document
    .querySelectorAll(".shape-tab")
    .forEach((t, i) => t.classList.toggle("active", shapes[i] === s));
}
showShape("circle");
function v(id) {
return parseFloat(document.getElementById(id).value);
}
function fmt(n) {
return isNaN(n) || !isFinite(n) ? "—" : parseFloat(n.toFixed(4));
}
function show(resId) {
document.getElementById(resId).style.display = "grid";
}
function calcShape(s) {
const PI = Math.PI;
if (s === "circle") {
    const r = v("g-cr");
    document.getElementById("g-ca").textContent = fmt(PI * r * r);
    document.getElementById("g-cp").textContent = fmt(2 * PI * r);
    document.getElementById("g-cd").textContent = fmt(2 * r);
    show("r-circle");
} else if (s === "rectangle") {
    const l = v("g-rl"),
    w = v("g-rw");
    document.getElementById("g-ra").textContent = fmt(l * w);
    document.getElementById("g-rp").textContent = fmt(2 * (l + w));
    document.getElementById("g-rd").textContent = fmt(
    Math.sqrt(l * l + w * w),
    );
    show("r-rectangle");
} else if (s === "triangle") {
    const a = v("g-ta"),
    b = v("g-tb"),
    c = v("g-tc");
    const sp = (a + b + c) / 2,
    area = Math.sqrt(sp * (sp - a) * (sp - b) * (sp - c));
    document.getElementById("g-tarea").textContent = fmt(area);
    document.getElementById("g-tperim").textContent = fmt(a + b + c);
    show("r-triangle");
} else if (s === "cube") {
    const s2 = v("g-cus");
    document.getElementById("g-cuv").textContent = fmt(s2 ** 3);
    document.getElementById("g-cusa").textContent = fmt(6 * s2 ** 2);
    show("r-cube");
} else if (s === "cylinder") {
    const r = v("g-cyr"),
    h = v("g-cyh");
    document.getElementById("g-cyv").textContent = fmt(PI * r * r * h);
    document.getElementById("g-cycsa").textContent = fmt(2 * PI * r * h);
    document.getElementById("g-cytsa").textContent = fmt(
    2 * PI * r * (r + h),
    );
    show("r-cylinder");
} else if (s === "sphere") {
    const r = v("g-spr");
    document.getElementById("g-spv").textContent = fmt(
    (4 / 3) * PI * r ** 3,
    );
    document.getElementById("g-spsa").textContent = fmt(4 * PI * r * r);
    show("r-sphere");
} else if (s === "cone") {
    const r = v("g-cor"),
    h = v("g-coh");
    const l = Math.sqrt(r * r + h * h);
    document.getElementById("g-conv").textContent = fmt(
    (1 / 3) * PI * r * r * h,
    );
    document.getElementById("g-cosl").textContent = fmt(l);
    document.getElementById("g-cotsa").textContent = fmt(
    PI * r * (r + l),
    );
    show("r-cone");
}
}

// ════════ EMI ════════
function calcEMI() {
const P = v("emiP"),
    r = v("emiR") / 12 / 100,
    n = v("emiT");
if (!P || !r || !n) return;
const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
const total = emi * n,
    interest = total - P;
document.getElementById("emiMonthly").textContent =
    "₹ " + emi.toFixed(2);
document.getElementById("emiTotal").textContent =
    "₹ " + total.toFixed(2);
document.getElementById("emiInterest").textContent =
    "₹ " + interest.toFixed(2);
document.getElementById("emiResult").style.display = "grid";
}

// ════════ DATA SIZE ════════
const dataBits = {
bit: 1,
byte: 8,
kb: 8 * 1024,
mb: 8 * 1024 ** 2,
gb: 8 * 1024 ** 3,
tb: 8 * 1024 ** 4,
pb: 8 * 1024 ** 5,
};
const dataNames = {
bit: "Bit",
byte: "Byte (B)",
kb: "Kilobyte (KB)",
mb: "Megabyte (MB)",
gb: "Gigabyte (GB)",
tb: "Terabyte (TB)",
pb: "Petabyte (PB)",
};
function convertData() {
const val = parseFloat(document.getElementById("dataVal").value);
const from = document.getElementById("dataFrom").value;
if (isNaN(val)) return;
const bits = val * dataBits[from];
const grid = document.getElementById("dataResultGrid");
grid.innerHTML = Object.keys(dataBits)
    .map((u) => {
    const converted = bits / dataBits[u];
    const display =
        converted < 0.0001
        ? converted.toExponential(4)
        : parseFloat(converted.toFixed(6));
    return `<div class="result-box" style="margin:0"><div class="res-label">${dataNames[u]}</div><div class="res-val">${display}</div></div>`;
    })
    .join("");
document.getElementById("dataResult").style.display = "block";
}

// ════════ TEMPERATURE ════════
function toC(val, from) {
if (from === "C") return val;
if (from === "F") return ((val - 32) * 5) / 9;
if (from === "K") return val - 273.15;
if (from === "R") return ((val - 491.67) * 5) / 9;
}
function fromC(c, to) {
if (to === "C") return c;
if (to === "F") return (c * 9) / 5 + 32;
if (to === "K") return c + 273.15;
if (to === "R") return ((c + 273.15) * 9) / 5;
}
const tempNames = {
C: "Celsius (°C)",
F: "Fahrenheit (°F)",
K: "Kelvin (K)",
R: "Rankine (°R)",
};
function convertTemp() {
const val = parseFloat(document.getElementById("tempVal").value);
const from = document.getElementById("tempFrom").value;
if (isNaN(val)) return;
const celsius = toC(val, from);
const grid = document.getElementById("tempResultGrid");
grid.innerHTML = Object.keys(tempNames)
    .map((u) => {
    const res = parseFloat(fromC(celsius, u).toFixed(4));
    return `<div class="result-box" style="margin:0"><div class="res-label">${tempNames[u]}</div><div class="res-val">${res}</div></div>`;
    })
    .join("");
document.getElementById("tempResult").style.display = "block";
}

// ════════ UNIT CONVERTER ════════
const unitData = {
length: {
    units: ["mm", "cm", "m", "km", "inch", "foot", "yard", "mile"],
    labels: [
    "Millimeter",
    "Centimeter",
    "Meter",
    "Kilometer",
    "Inch",
    "Foot",
    "Yard",
    "Mile",
    ],
    toBase: [0.001, 0.01, 1, 1000, 0.0254, 0.3048, 0.9144, 1609.344],
},
weight: {
    units: ["mg", "g", "kg", "tonne", "oz", "lb"],
    labels: ["Milligram", "Gram", "Kilogram", "Tonne", "Ounce", "Pound"],
    toBase: [0.000001, 0.001, 1, 1000, 0.0283495, 0.453592],
},
speed: {
    units: ["mps", "kph", "mph", "knot", "fps"],
    labels: ["m/s", "km/h", "mph", "Knot", "ft/s"],
    toBase: [1, 0.27778, 0.44704, 0.514444, 0.3048],
},
area: {
    units: ["mm2", "cm2", "m2", "km2", "inch2", "ft2", "acre", "hectare"],
    labels: ["mm²", "cm²", "m²", "km²", "in²", "ft²", "Acre", "Hectare"],
    toBase: [
    0.000001, 0.0001, 1, 1e6, 0.00064516, 0.092903, 4046.86, 10000,
    ],
},
volume: {
    units: ["ml", "L", "m3", "cm3", "floz", "cup", "pt", "gal"],
    labels: [
    "mL",
    "Liter",
    "m³",
    "cm³",
    "fl oz",
    "Cup",
    "Pint",
    "Gallon",
    ],
    toBase: [
    0.001, 1, 1000, 0.001, 0.0295735, 0.236588, 0.473176, 3.78541,
    ],
},
time: {
    units: ["ms", "s", "min", "hr", "day", "week", "month", "year"],
    labels: [
    "Millisecond",
    "Second",
    "Minute",
    "Hour",
    "Day",
    "Week",
    "Month",
    "Year",
    ],
    toBase: [0.001, 1, 60, 3600, 86400, 604800, 2629746, 31556952],
},
};
function updateUnitOptions() {
const cat = document.getElementById("unitCat").value;
const data = unitData[cat];
["unitFrom", "unitTo"].forEach((id, i) => {
    const sel = document.getElementById(id);
    sel.innerHTML = data.units
    .map((u, j) => `<option value="${j}">${data.labels[j]}</option>`)
    .join("");
    sel.selectedIndex = i === 1 ? 1 : 0;
});
}
updateUnitOptions();
function convertUnit() {
const cat = document.getElementById("unitCat").value;
const data = unitData[cat];
const val = parseFloat(document.getElementById("unitVal").value);
const from = parseInt(document.getElementById("unitFrom").value);
const to = parseInt(document.getElementById("unitTo").value);
if (isNaN(val)) return;
const base = val * data.toBase[from];
const result = base / data.toBase[to];
const res = parseFloat(result.toFixed(8));
document.getElementById("unitResultVal").textContent =
    `${val} ${data.labels[from]} = ${res} ${data.labels[to]}`;
document.getElementById("unitResult").style.display = "block";
}

// ════════ AGE CALCULATOR ════════
function calcAge() {
const dob = new Date(document.getElementById("dobInput").value);
const target = document.getElementById("targetDate").value
    ? new Date(document.getElementById("targetDate").value)
    : new Date();
if (isNaN(dob)) return;

let years = target.getFullYear() - dob.getFullYear();
let months = target.getMonth() - dob.getMonth();
let days = target.getDate() - dob.getDate();
if (days < 0) {
    months--;
    days += new Date(
    target.getFullYear(),
    target.getMonth(),
    0,
    ).getDate();
}
if (months < 0) {
    years--;
    months += 12;
}

const totalDays = Math.floor((target - dob) / 86400000);
const totalWeeks = Math.floor(totalDays / 7);
const totalMonths = years * 12 + months;
const totalHours = totalDays * 24;
const nextBirthday = new Date(
    target.getFullYear(),
    dob.getMonth(),
    dob.getDate(),
);
if (nextBirthday < target)
    nextBirthday.setFullYear(target.getFullYear() + 1);
const daysToB = Math.ceil((nextBirthday - target) / 86400000);

const items = [
    ["Age", `${years} yrs, ${months} mo, ${days} days`],
    ["Total Days", totalDays.toLocaleString()],
    ["Total Weeks", totalWeeks.toLocaleString()],
    ["Total Months", totalMonths.toLocaleString()],
    ["Total Hours", totalHours.toLocaleString()],
    ["Days to Birthday", daysToB + " days"],
];
document.getElementById("ageGrid").innerHTML = items
    .map(
    ([l, v]) =>
        `<div class="result-box" style="margin:0"><div class="res-label">${l}</div><div class="res-val">${v}</div></div>`,
    )
    .join("");
document.getElementById("ageResult").style.display = "block";
}
// ════════ GST CALCULATOR ════════
let gstMode = "add"; // "add" or "remove"

function setGstMode(mode) {
  gstMode = mode;
  document.getElementById("gstModeAdd").classList.toggle("active", mode === "add");
  document.getElementById("gstModeRemove").classList.toggle("active", mode === "remove");
  document.getElementById("gstAmountLabel").textContent =
    mode === "add" ? "Original Amount (₹)" : "Amount with GST (₹)";
  calcGST();
}

document.getElementById("gstRate").addEventListener("change", function () {
  document.getElementById("gstCustomRow").style.display =
    this.value === "custom" ? "flex" : "none";
  calcGST();
});

function calcGST() {
  const amountInput = parseFloat(document.getElementById("gstAmount").value);
  const rateSelect = document.getElementById("gstRate").value;
  const rate =
    rateSelect === "custom"
      ? parseFloat(document.getElementById("gstCustomRate").value)
      : parseFloat(rateSelect);

  if (isNaN(amountInput) || isNaN(rate)) {
    document.getElementById("gstResult").style.display = "none";
    return;
  }

  let originalAmt, gstAmt, totalAmt;

  if (gstMode === "add") {
    originalAmt = amountInput;
    gstAmt = (amountInput * rate) / 100;
    totalAmt = amountInput + gstAmt;
  } else {
    totalAmt = amountInput;
    originalAmt = (amountInput * 100) / (100 + rate);
    gstAmt = totalAmt - originalAmt;
  }

  const fmt = (n) =>
    "₹ " + parseFloat(n.toFixed(2)).toLocaleString("en-IN", { minimumFractionDigits: 2 });

  const half = rate / 2;

  // Summary cards
  document.getElementById("gstSummaryGrid").innerHTML = [
    ["Original Amount", fmt(originalAmt)],
    ["GST Amount (" + rate + "%)", fmt(gstAmt)],
    ["Total Amount", fmt(totalAmt)],
  ]
    .map(
      ([l, val]) =>
        `<div class="result-box" style="margin:0"><div class="res-label">${l}</div><div class="res-val">${val}</div></div>`
    )
    .join("");

  // CGST / SGST / IGST
  document.getElementById("cgstPct").textContent = half + "%";
  document.getElementById("sgstPct").textContent = half + "%";
  document.getElementById("igstPct").textContent = rate + "%";
  document.getElementById("cgstAmt").textContent = fmt(gstAmt / 2);
  document.getElementById("sgstAmt").textContent = fmt(gstAmt / 2);
  document.getElementById("igstAmt").textContent = fmt(gstAmt);

  document.getElementById("gstResult").style.display = "block";
}