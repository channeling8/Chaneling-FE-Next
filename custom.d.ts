declare module "*.svg" {
    import type { FC, SVGProps } from "react";

    export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
    const Component: FC<SVGProps<SVGSVGElement>>;
    export default Component;
}

declare module "*.svg?url" {
    const content: string;
    export default content;
}
