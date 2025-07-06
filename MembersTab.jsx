import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MembersTab = ({ members, userRole, onMemberUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = selectedRole === 'all' || member.role.toLowerCase() === selectedRole.toLowerCase();
    
    return matchesSearch && matchesRole;
  });

  const formatJoinDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const getRoleColor = (role) => {
    const colors = {
      'President': 'bg-purple-100 text-purple-800',
      'Vice President': 'bg-blue-100 text-blue-800',
      'Secretary': 'bg-green-100 text-green-800',
      'Treasurer': 'bg-orange-100 text-orange-800',
      'Member': 'bg-gray-100 text-gray-800'
    };
    return colors[role] || colors['Member'];
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 md:max-w-md">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Roles</option>
              <option value="president">President</option>
              <option value="vice president">Vice President</option>
              <option value="secretary">Secretary</option>
              <option value="treasurer">Treasurer</option>
              <option value="member">Member</option>
            </select>
            
            {userRole === 'admin' && (
              <Button variant="primary" iconName="UserPlus">
                Invite Members
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-surface rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${
                    member.isActive ? 'bg-success' : 'bg-text-muted'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{member.name}</h3>
                  <p className="text-sm text-text-secondary">{member.major}</p>
                </div>
              </div>
              
              {userRole === 'admin' && (
                <button className="p-1 text-text-muted hover:text-text-primary">
                  <Icon name="MoreHorizontal" size={16} />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Role</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                  {member.role}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Year</span>
                <span className="text-sm text-text-primary">{member.year}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Joined</span>
                <span className="text-sm text-text-primary">{formatJoinDate(member.joinDate)}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <div className="text-sm text-text-secondary mb-2">Skills</div>
              <div className="flex flex-wrap gap-1">
                {member.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-background border border-border rounded text-xs text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
                {member.skills.length > 3 && (
                  <span className="px-2 py-1 bg-background border border-border rounded text-xs text-text-secondary">
                    +{member.skills.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="MessageCircle" className="flex-1">
                Message
              </Button>
              <Button variant="outline" size="sm" iconName="User" className="flex-1">
                Profile
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No members found</h3>
          <p className="text-text-muted mb-6">
            {searchQuery || selectedRole !== 'all' ?'Try adjusting your search or filters.' :'This club doesn\'t have any members yet.'}
          </p>
          {userRole === 'admin' && !searchQuery && selectedRole === 'all' && (
            <Button variant="primary" iconName="UserPlus">
              Invite First Members
            </Button>
          )}
        </div>
      )}

      {/* Member Stats */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Member Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{members.length}</div>
            <div className="text-sm text-text-secondary">Total Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{members.filter(m => m.isActive).length}</div>
            <div className="text-sm text-text-secondary">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{members.filter(m => m.role !== 'Member').length}</div>
            <div className="text-sm text-text-secondary">Leadership</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{members.filter(m => new Date(m.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</div>
            <div className="text-sm text-text-secondary">New This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersTab;