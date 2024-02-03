import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    timeout,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    BloomPlugin,
    TemporalAAPlugin,
    AnisotropyPlugin,
    GammaCorrectionPlugin,
    ACameraControlsPlugin,

    addBasePlugins,
    AssetManagerLoadingBarPlugin,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin, FileTransferPlugin,
    addEditorPlugins,
    CoreEditorApp,
    PresetLibraryPlugin,
  defaultPresets,
  CameraViewPlugin,
  DropzonePlugin,
  PickingPlugin,
  CanvasRecorderPlugin,
  PopmotionPlugin,
  LightsUiPlugin,
  HierarchyUiPlugin,
  ExtrasUiPlugin,
  MaterialConfiguratorPlugin,
  SwitchNodePlugin,
  SSGIPlugin,
  CameraUiPlugin,
  AssetExporterPlugin,
  SimpleViewerUi,
  ThinFilmLayerPlugin,
  Vector3,
  MeshStandardMaterial,
  PlaneGeometry,
  Mesh,
  Box3,
  Light,
  SimpleBackgroundEnvUiPlugin

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import "./styles.css";

async function setupViewer(){

    // Initialize the viewer
    const viewer = new CoreEditorApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
    })


    //viewer.scene.activeCamera.userData.minNearPlane = 0.2;

    

    console.log(defaultPresets);

    // Add plugins individually.
    // await viewer.addPlugin(GBufferPlugin)
     await viewer.addPlugin(new ProgressivePlugin(32))
   //  await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
   //await viewer.addPlugin(GammaCorrectionPlugin)
     await viewer.addPlugin(SSRPlugin)
     await viewer.addPlugin(SSAOPlugin)
     await viewer.addPlugin(DiamondPlugin)
    //await viewer.addPlugin(FrameFadePlugin)
     await viewer.addPlugin(GLTFAnimationPlugin)
       await viewer.addPlugin(GroundPlugin)
    // await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
     await viewer.addPlugin(AnisotropyPlugin)
     await viewer.addPlugin(AssetManagerPlugin)
     await viewer.addPlugin(CameraViewPlugin)
     await viewer.addPlugin(DropzonePlugin)
    // and many more...

    // or use this to add all main ones at once.
    await addBasePlugins(viewer) // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // Required for downloading files from the UI
    await viewer.addPlugin(FileTransferPlugin)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    await viewer.addPlugin(PickingPlugin)
    await viewer.addPlugin(CanvasRecorderPlugin)
    await viewer.addPlugin(PopmotionPlugin)
    await viewer.addPlugin(LightsUiPlugin)
    await viewer.addPlugin(HierarchyUiPlugin)
    await viewer.addPlugin(ExtrasUiPlugin)
    await viewer.addPlugin(MaterialConfiguratorPlugin)
    await viewer.addPlugin(SwitchNodePlugin)
    await viewer.addPlugin(SSGIPlugin)
    await viewer.addPlugin(TemporalAAPlugin)
    await viewer.addPlugin(CameraUiPlugin)
    await viewer.addPlugin(AssetExporterPlugin)
    await viewer.addPlugin(ThinFilmLayerPlugin)
    await viewer.addPlugin(CameraViewPlugin)
    await viewer.addPlugin(SimpleBackgroundEnvUiPlugin)
   
   

    // Import and add a GLB file.
    await viewer.load("")

  

   viewer.getPlugin(GroundPlugin).enabled = false;

  

    // Load an environment map if not set in the glb file
     await viewer.setEnvironmentMap("./assets/environment.hdr");

    // Add some UI for tweak and testing.
    const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    uiPlugin.setupPlugins<IViewerPlugin>(AssetManagerPlugin, SimpleBackgroundEnvUiPlugin, HierarchyUiPlugin, DropzonePlugin, CameraUiPlugin, TonemapPlugin, LightsUiPlugin, CameraViewPlugin, ProgressivePlugin, ThinFilmLayerPlugin, SSAOPlugin, GroundPlugin, CanvasSnipperPlugin, AssetExporterPlugin, CanvasRecorderPlugin, PopmotionPlugin, TemporalAAPlugin, SSGIPlugin, SSRPlugin, DiamondPlugin, PickingPlugin, GLTFAnimationPlugin, SwitchNodePlugin, MaterialConfiguratorPlugin, ExtrasUiPlugin, AnisotropyPlugin)

    viewer.renderer.refreshPipeline()

    const controls = viewer.scene.activeCamera.controls;
    controls.minDistance = 5;
    controls.maxDistance = 15;

    

}

setupViewer()
