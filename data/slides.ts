import { SlidesSectionProps } from "@/components/organisms/SlidesSection/SlidesSection";

export const sectionFirstSlides: SlidesSectionProps = {
  id: "kimjestem",
  sectionName: "section_first_slides_title",
  ariaLabel: "section_first_slides_title",
  boxPadding: 0,
  hasBackground: false,
  reverse: true,
  slides: [
    {
      description: "section_first_slides_slide_1_description",
      imageAlt: "section_second_slides_slide_1_title",
      imageSrc: "/section_01_01.webp",
      imageSrcDimensions: { width: 580, height: 338 },
      colorImageSrc: "/section_01_01_color.webp",
      isImageLoadingEager: true,
    },
    {
      description: "section_first_slides_slide_2_description",
      imageAlt: "section_second_slides_slide_2_title",
      imageSrc: "/section_01_02.webp",
      imageSrcDimensions: { width: 580, height: 338 },
      colorImageSrc: "/section_01_02_color.webp",
    },
    {
      description: "section_first_slides_slide_3_description",
      imageAlt: "section_second_slides_slide_3_title",
      imageSrc: "/section_01_03.webp",
      imageSrcDimensions: { width: 580, height: 338 },
      colorImageSrc: "/section_01_03_color.webp",
    },
  ],
};

export const sectionSecondSlides: SlidesSectionProps = {
  id: "jakpracuje",
  sectionName: "section_second_slides_title",
  ariaLabel: "section_second_slides_title",
  slides: [
    {
      title: "section_second_slides_slide_1_title",
      description: "section_second_slides_slide_1_description",
      imageAlt: "section_second_slides_slide_1_title",
      imageSrc: "/section_02_01.webp",
      imageSrcDimensions: { width: 580, height: 472 },
      colorImageSrc: "/section_02_01_color.webp",
      isImageLoadingEager: true,
    },
    {
      title: "section_second_slides_slide_2_title",
      description: "section_second_slides_slide_2_description",
      imageAlt: "section_second_slides_slide_2_title",
      imageSrc: "/section_02_02.webp",
      imageSrcDimensions: { width: 580, height: 472 },
      colorImageSrc: "/section_02_02_color.webp",
    },
    {
      title: "section_second_slides_slide_3_title",
      description: "section_second_slides_slide_3_description",
      imageAlt: "section_second_slides_slide_3_title",
      imageSrc: "/section_02_03.webp",
      imageSrcDimensions: { width: 580, height: 472 },
      colorImageSrc: "/section_02_03_color.webp",
    },
    {
      title: "section_second_slides_slide_4_title",
      description: "section_second_slides_slide_4_description",
      imageAlt: "section_second_slides_slide_4_title",
      imageSrc: "/section_02_04.webp",
      imageSrcDimensions: { width: 580, height: 472 },
      colorImageSrc: "/section_02_04_color.webp",
    },
    {
      title: "section_second_slides_slide_5_title",
      description: "section_second_slides_slide_5_description",
      imageAlt: "section_second_slides_slide_5_title",
      imageSrc: "/section_02_05.webp",
      imageSrcDimensions: { width: 580, height: 472 },
      colorImageSrc: "/section_02_05_color.webp",
    },
  ],
};
