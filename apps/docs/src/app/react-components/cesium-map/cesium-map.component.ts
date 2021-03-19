(window as any).CESIUM_BASE_URL = '/apps/docs/assets/cesium';

// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  Renderer2,
  NgZone,
} from '@angular/core';
import * as React from 'react';
import { ReactWrapperComponent } from '@angular-react/core';

import {
  BoundingRectangle,
  BoundingSphere,
  CallbackProperty,
  Cartesian2,
  Cartesian3,
  Cartographic,
  ClassificationType,
  Color,
  ColorMaterialProperty,
  ColorGeometryInstanceAttribute,
  createWorldTerrain,
  defined,
  DistanceDisplayCondition,
  Ellipsoid,
  GeoJsonDataSource,
  GroundPrimitive,
  HeightReference,
  HorizontalOrigin,
  Ion,
  IonResource,
  LabelGraphics,
  LabelStyle,
  Math as CesiumMath,
  PinBuilder,
  PolygonGeometry,
  PolygonHierarchy,
  Rectangle,
  SceneMode,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  TextureMinificationFilter,
  TileMapServiceImageryProvider,
  UrlTemplateImageryProvider,
  VerticalOrigin,
  WebMapServiceImageryProvider,
  VertexFormat,
} from "cesium";
import { Cesium3DTileset, Entity, ImageryLayer, Scene, Globe, Viewer } from "resium";
import CesiumNavigation from 'cesium-navigation-es6'

// Your access token can be found at: https://cesium.com/ion/tokens.
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYThkNjU5OC00ZWMwLTQ4YjctOTc3Mi1lMzkxNDQxM2Y1OGQiLCJpZCI6MzIzNSwiaWF0IjoxNTM2NTYwOTQ1fQ.6hTn29nQ_F1k4C7YpApgHbqm-51bNMZJHZ1_CdW2f5A'

@Component({
  selector: 'app-cesium-map',
  template: `
    <CesiumMap
      #reactNode
      [text]="text"
      (onMouseEnter)="onMouseEnter($event)"
      (onMouseLeave)="onMouseLeave($event)"
      [styles]="{
        width: size,
        lineHeight: size,
        height: size,
        left: x,
        top: y,
        color: color,
        backgroundColor: backgroundColor,
        fontSize: size
      }"
    >
      <react-content> <ng-content></ng-content> </react-content>
    </CesiumMap>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['react-renderer'],
})
export class CesiumMapComponent extends ReactWrapperComponent<CesiumMapProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() x: string;
  @Input() y: string;
  @Input() size: string;
  @Input() text: string;
  @Input() color: string;
  @Input() backgroundColor: string;
  @Input() textOverride: string;

  @Output('onMouseEnter') readonly mouseEnter = new EventEmitter<MouseEvent>();
  @Output('onMouseLeave') readonly mouseLeave = new EventEmitter<MouseEvent>();

  onMouseEnter = (ev: MouseEvent) => this.mouseEnter.emit(ev);
  onMouseLeave = (ev: MouseEvent) => this.mouseLeave.emit(ev);

  get computedText() {
    return this.textOverride && this.text ? this.textOverride : this.text;
  }

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });
  }
}

interface CesiumMapProps {
  onMouseEnter?: (ev: MouseEvent) => void;
  onMouseLeave?: (ev: MouseEvent) => void;
  text: string;
  styles?: object;
}

export class CesiumMap extends React.Component<CesiumMapProps> {
  
  state = {
    usesNaverBasic: true,
  }

  private static defaultStyle = {
    // display: 'block',
    // position: 'absolute',
    // textAlign: 'center',
    // borderRadius: '30%',
    // cursor: 'pointer',
  };

  private viewer?: HTMLElement;

  render() {
    const { text, styles, ...rest } = this.props;

    const scene = React.createElement(Scene, {key: 'app-map-scene'})
    const globe = React.createElement(Globe, {
      key: 'app-map-globe',
      depthTestAgainstTerrain: false,
      enableLighting: false,
    })

    const mapExtent = Rectangle.fromDegrees(117.896284, 31.499028, 139.597380, 43.311528)

    const viewer_ = React.createElement(
      Viewer,
      {
        key: 'app-map-viewer',
        full: true,
        ref: (e: any) => {this.viewer = e && e.cesiumElement},
        // terrainProvider: getTerrainProvider(),
      },
      [
        scene,
        globe,
        this.state.usesNaverBasic && React.createElement(ImageryLayer, {
          key: 'app-naver-basic-map',
          imageryProvider: new UrlTemplateImageryProvider({
            url: 'https://map.pstatic.net/nrb/styles/basic/1614855029/{z}/{x}/{y}.png',
            minimumLevel: 0,
            maximumLevel: 21,
            rectangle: mapExtent
          }),
          // minificationFilter: TextureMinificationFilter.LINEAR,
          // magnificationFilter: TextureMinificationFilter.LINEAR,
        })
      ].filter(el => !!el)
    )

    return React.createElement(
      'div',
      { // props
        ...rest,
        style: {
          ...CesiumMap.defaultStyle,
          ...styles,
        }
      },
      [ // children
        viewer_,
        this.props.children
      ]
    )
  }
}
