import React from 'react';
import GroupCard from './GroupCard';
import type { Group } from '../types';

interface GroupGridProps {
	title: string;
	subtitle?: string;
	groups: Group[];
}

const GroupGrid: React.FC<GroupGridProps> = ({ title, subtitle, groups }) => {
	return (
		<section className="my-12">
			<div className="mb-8 text-center">
				<h2 className="text-xl font-bold">{title}</h2>
				{subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{groups && groups.length > 0 ? (
					groups.map((g) => <GroupCard key={g.id} group={g as Group} />)
				) : (
					<div className="text-gray-500">No groups found.</div>
				)}
			</div>
		</section>
	);
};

export default GroupGrid;
