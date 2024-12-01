/**
 * Creates a slider with a label
 *
 * @param {string} name - The text for the label.
 * @param {number} min - The minimum value of the slider.
 * @param {number} max - The maximum value of the slider.
 * @param {number} value - The initial value of the slider.
 * @param {number} step - The increment step of the slider.
 * @param {function} func - A callback function that is invoked whenever the slider value changes.
 *
 * @example <caption>Example HTML Generated</caption>
 *   <div class="sliderContainer">
 *     <label>Volume</label>
 *     <input type="range" min="0" max="100" value="50" step="1" />
 *   </div>
 *
 * @example <caption>Example Usage</caption>
 * createSlider("Volume", 0, 100, 50, 1, (value) => {
 *     console.log(`Slider value: ${value}`);
 * });
 */
function createSlider(name, min, max, value, step, func) {
  // Create a wrapper for the slider and label
  const container = document.createElement("div");
  container.classList.add("slidercontainer");

  // Create the label element
  const label = document.createElement("label");
  label.textContent = name;
  label.classList.add("sliderLabel");

  // Create the slider input
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = min;
  slider.max = max;
  slider.value = value;
  slider.step = step;

  // Handle slider change event
  slider.addEventListener("input", (event) => {
    func(event.target.value);
  });

  // Append label and slider to the wrapper
  container.appendChild(label);
  container.appendChild(slider);

  return container;
}

export { createSlider };
