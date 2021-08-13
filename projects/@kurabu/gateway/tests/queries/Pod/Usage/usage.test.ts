import { IQueryResultStatus } from '#queries/IQuery';
import { PodUsageQueryHandler } from '#queries/Pod/Usage/PodUsageQueryHandler';
import { expect } from 'chai';

export function Usage() {
    describe("Usage", () => {
        it("Handle should succeed", async () => {
            var sut = new PodUsageQueryHandler();

            var result = await sut.handle({});

            expect(result.success).to.be.equal(IQueryResultStatus.SUCCESS);
        });
    });
}
