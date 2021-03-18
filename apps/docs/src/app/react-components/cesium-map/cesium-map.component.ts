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

    const scene = React.createElement(Scene)
    const globe = React.createElement(Globe, {
      depthTestAgainstTerrain: false,
      enableLighting: false,
    })

    const mapExtent = Rectangle.fromDegrees(117.896284, 31.499028, 139.597380, 43.311528)

    const viewer_ = React.createElement(
      Viewer,
      {
        full: true,
        ref: (e: any) => {this.viewer = e && e.cesiumElement},
        // terrainProvider: getTerrainProvider(),
      },
      [
        scene,
        globe,
        this.state.usesNaverBasic && React.createElement(ImageryLayer, {
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
