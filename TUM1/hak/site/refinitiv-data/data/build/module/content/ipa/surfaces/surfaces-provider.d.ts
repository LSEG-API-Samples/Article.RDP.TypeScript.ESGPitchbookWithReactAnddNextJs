import { ApiEndpoints, Session } from '../../../session';
import { AbstractContentProvider } from '../../abstract-content-provider';
import { ContentResponse } from '../../base-interfaces/content-response';
import * as Surfaces from './surfaces.interface';
export declare class SurfacesProvider extends AbstractContentProvider {
    apiGroup: keyof ApiEndpoints;
    endpointName: string;
    private dataAccessor;
    constructor(session: Session);
    getSurfaces(universe: Surfaces.RequestItem[], params?: Surfaces.InstrumentParams): Promise<ContentResponse<never>>;
}
