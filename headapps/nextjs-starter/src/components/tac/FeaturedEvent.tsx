import {
  Text,
  Image,
  withDatasourceCheck,
  Link,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { BaseContentFields } from 'lib/component-props/events';
import { ComponentProps } from 'lib/component-props';
import NextLink from 'next/link';
import React from 'react';

type FeaturedEventProps = ComponentProps &
  BaseContentFields & {
    fields: {
      FeaturedLink: LinkField;
    };
    params: {
      cssClass?: string;
      styles?: string;
      RenderingIdentifier?: string;
      message?: string;
    };
  };

type ComponentContentProps = {
  id?: string;
  styles?: string;
  children: React.ReactNode;
};

const ComponentContent = (props: ComponentContentProps) => {
  return (
    <div
      className={`component featured-event ${props.styles ?? ''}`}
      id={props.id || undefined}
    >
      <div className="component-content">{props.children}</div>
    </div>
  );
};

const NoImageFeaturedEvent = (props: FeaturedEventProps): React.JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <ComponentContent id={id} styles={props.params?.styles}>
      <div className="no-image card">
        <div className="card-body">
          <h5 className="card-title">
            <Text field={props.fields.Title} />
          </h5>
          <p className="card-text">
            <Text field={props.fields.Intro} />
          </p>
          <NextLink href="/" className={props.params?.cssClass}>
            {props.params?.message ?? 'Learn More'}
          </NextLink>
        </div>
      </div>
    </ComponentContent>
  );
};
export const NoImage = withDatasourceCheck()<FeaturedEventProps>(
  NoImageFeaturedEvent
);

const FeaturedEvent = (props: FeaturedEventProps): React.JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <ComponentContent id={id} styles={props.params?.styles}>
      <div className="card">
        <Image field={props.fields.NavigationImage} className="img-fluid" />
        <div className="card-body">
          <h3 className="card-title">
            {props.fields?.Title?.value ? (
                <Text field={props.fields.Title} editable={false} />
            ) : (
                <span>No Title</span>
            )}
          </h3>
          <p className="card-text">
            <Text field={props.fields.Intro} />
          </p>
          {props.fields.FeaturedLink?.value?.href ? (
            <Link
              field={props.fields.FeaturedLink}
              className={props.params?.cssClass}
              editable={false}
            >
              Learn More
            </Link>
          ) : (
            <NextLink href="/" className={props.params?.cssClass}>
              Learn More
            </NextLink>
          )}
        </div>
      </div>
    </ComponentContent>
  );
};

export const Default = withDatasourceCheck()<FeaturedEventProps>(
  FeaturedEvent
);
