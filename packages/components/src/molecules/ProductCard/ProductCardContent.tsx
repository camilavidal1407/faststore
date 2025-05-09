import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'

import type { PriceDefinition } from '../../typings/PriceDefinition'

import {
  Badge,
  Button,
  DiscountBadge,
  Icon,
  Label,
  Link,
  type LinkElementType,
  type LinkProps,
  ProductPrice,
  Rating,
} from '../../'

export interface ProductCardContentProps extends HTMLAttributes<HTMLElement> {
  /**
   * ID to find this component in testing tools (e.g.: cypress, testing library, and jest).
   */
  testId?: string
  /**
   * Specifies the product's title.
   */
  title: string
  /**
   * Props for the link from the ProductCard component.
   */
  linkProps?: Partial<LinkProps<LinkElementType>>
  /**
   * Specifies product's prices.
   */
  price?: PriceDefinition
  /**
   * Enables an outOfStock status.
   */
  outOfStock?: boolean
  /**
   * Specifies the OutOfStock badge's label.
   */
  outOfStockLabel?: string
  /**
   * Specifies the Rating Value of the product.
   */
  ratingValue?: number
  /**
   * Specifies the button's label.
   */
  buttonLabel?: string
  /**
   * Enables a DiscountBadge to the component.
   */
  showDiscountBadge?: boolean
  /**
   * Callback function when the button is clicked.
   */
  onButtonClick?: () => void
  /**
   * Specifies whether the displayed price should include taxes.
   */
  includeTaxes?: boolean
  /**
   * Specifies the include taxes label, if taxes are included.
   */
  includeTaxesLabel?: string
  /**
   * Specifies if the displayed product is sponsored.
   */
  sponsored?: boolean
  /**
   * Specifies the sponsored label, if advertisement is applicable.
   */
  sponsoredLabel?: string
}

const ProductCardContent = forwardRef<HTMLElement, ProductCardContentProps>(
  function CardContent(
    {
      testId = 'fs-product-card-content',
      title,
      linkProps,
      price,
      outOfStock,
      outOfStockLabel = 'Out of stock',
      ratingValue,
      showDiscountBadge,
      buttonLabel = 'Add',
      onButtonClick,
      children,
      includeTaxes = false,
      includeTaxesLabel = 'Tax included',
      sponsored = false,
      sponsoredLabel = 'Sponsored',
      ...otherProps
    },
    ref
  ) {
    const listingPrice = price?.listPrice ? price.listPrice : 0
    const sellingPrice = price?.value ? price.value : 0

    return (
      <section
        ref={ref}
        data-fs-product-card-content
        data-fs-product-card-badge={showDiscountBadge}
        data-testid={testId}
        {...otherProps}
      >
        {sponsored && (
          <span data-fs-product-card-sponsored-label>{sponsoredLabel}</span>
        )}
        <div data-fs-product-card-heading>
          <h3 data-fs-product-card-title>
            <Link {...linkProps} title={title}>
              <span>{title}</span>
            </Link>
          </h3>
          {!outOfStock && (
            <ProductPrice
              data-fs-product-card-prices
              value={sellingPrice}
              listPrice={listingPrice}
              formatter={price?.formatter}
            />
          )}
          {includeTaxes && (
            <Label data-fs-product-card-taxes-label>{includeTaxesLabel}</Label>
          )}
          {ratingValue && (
            <Rating value={ratingValue} icon={<Icon name="Star" />} />
          )}
        </div>
        {showDiscountBadge && !outOfStock && (
          <DiscountBadge listPrice={listingPrice} spotPrice={sellingPrice} />
        )}
        {outOfStock && <Badge>{outOfStockLabel}</Badge>}
        {onButtonClick && !outOfStock && (
          <div data-fs-product-card-actions>
            <Button
              variant="primary"
              icon={<Icon name="ShoppingCart" />}
              iconPosition="left"
              size="small"
              onClick={onButtonClick}
            >
              {buttonLabel}
            </Button>
          </div>
        )}
      </section>
    )
  }
)

export default ProductCardContent
