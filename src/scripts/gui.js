import GUI from "lil-gui";

/**
 * Sets up the GUI for the given uniforms object.
 * Adds a reset button to revert uniforms and camera to their initial values.
 *
 * @param {object} uniforms - The uniforms object containing shader parameters.
 * @param {THREE.Camera} camera - The camera object to be reset.
 */
export function setupGUI(uniforms, camera) {
  const gui = new GUI();

  // Save initial values for reset functionality
  const initialValues = {
    uTimeMultiplier: uniforms.uTimeMultiplier.value,
    uAmplitudeMultiplier: uniforms.uAmplitudeMultiplier.value,
    uNoiseScale: uniforms.uNoiseScale.value,
    uFreq: uniforms.uFreq.value,
    uStrengthOffset: uniforms.uStrengthOffset.value,
    uCol1: uniforms.uCol1.value.clone(),
    uCol2: uniforms.uCol2.value.clone(),
    cameraPosition: camera.position.clone(), // Save initial camera position
  };

  // Add GUI controls
  gui
    .add(uniforms.uTimeMultiplier, "value")
    .min(0.0)
    .max(4)
    .step(0.1)
    .name("Time Multiplier")
    .listen();

  gui
    .add(uniforms.uFreq, "value")
    .min(0.0)
    .max(50)
    .step(1)
    .name("Frequency")
    .listen();

  gui
    .add(uniforms.uStrengthOffset, "value")
    .min(0.0)
    .max(5)
    .step(0.1)
    .name("Strength Offset")
    .listen();

  gui
    .add(uniforms.uNoiseScale, "value")
    .min(0.0)
    .max(50)
    .step(1)
    .name("Noise Scale")
    .listen();

  gui
    .add(uniforms.uAmplitudeMultiplier, "value")
    .min(0.0)
    .max(10)
    .step(1)
    .name("Amplitude Multiplier")
    .listen();

  gui.addColor(uniforms.uCol1, "value").name("Color 1").listen();

  gui.addColor(uniforms.uCol2, "value").name("Color 2").listen();

  // Add a reset button for uniforms
  gui
    .add(
      {
        resetUniforms: () => {
          // Reset uniforms to their initial values
          uniforms.uTimeMultiplier.value = initialValues.uTimeMultiplier;
          uniforms.uAmplitudeMultiplier.value =
            initialValues.uAmplitudeMultiplier;
          uniforms.uNoiseScale.value = initialValues.uNoiseScale;
          uniforms.uFreq.value = initialValues.uFreq;
          uniforms.uStrengthOffset.value = initialValues.uStrengthOffset;
          uniforms.uCol1.value.copy(initialValues.uCol1); // Use `copy` for THREE.Color
          uniforms.uCol2.value.copy(initialValues.uCol2);
        },
      },
      "resetUniforms"
    )
    .name("Reset Uniforms");

  // Add a reset button for camera position
  gui
    .add(
      {
        resetCamera: () => {
          // Reset camera position to the initial position
          camera.position.copy(initialValues.cameraPosition);
          camera.updateProjectionMatrix(); // Ensure the projection matrix is updated

          // Optionally, if you expose the camera position in GUI, you can manually update it
          console.log("Camera position reset.");
        },
      },
      "resetCamera"
    )
    .name("Reset Camera");

  return gui; // Return the GUI instance for further customization
}
